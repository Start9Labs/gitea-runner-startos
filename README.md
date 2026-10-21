<p align="center">
  <img src="icon.svg" alt="Gitea Runner Logo" width="21%">
</p>

# Gitea Runner on StartOS

> Everything not listed in this document should behave the same as upstream
> Gitea Runner. If a feature, setting, or behavior is not mentioned here, the
> upstream documentation is accurate and fully applicable — see the
> Documentation section of `instructions.md` for links.

[Gitea Runner](https://gitea.com/gitea/runner) executes Actions workflows for this device's Gitea. The package adds assignment-only VM isolation, a bounded shared guest-memory pool, and an explicit container backend.

---

## Table of Contents

- [Image and Container Runtime](#image-and-container-runtime)
- [Volume and Data Layout](#volume-and-data-layout)
- [File Models](#file-models)
- [Dependencies](#dependencies)
- [Network Access and Interfaces](#network-access-and-interfaces)
- [Installation and First-Run Flow](#installation-and-first-run-flow)
- [Actions](#actions)
- [Tasks](#tasks)
- [Health Checks](#health-checks)
- [Backups and Restore](#backups-and-restore)
- [Limitations and Differences](#limitations-and-differences)
- [Quick Reference for AI Consumers](#quick-reference-for-ai-consumers)

---

## Image and Container Runtime

A custom Debian image builds the pinned upstream source with package patches. The VM lifecycle, Docker engine, resource policy, public-CA installation and process probes come from the pinned shared runtime in `forgejo-runner-startos`; Gitea registration and CLI handling remain package-specific.

| Subcontainer | Purpose |
| --- | --- |
| `registration-owner` | Publishes the authoritative persistent registration before controllers start |
| `vm-image-preparation` | Downloads and prepares the guest base on virtualized startup |
| `vm-memory-pool` | Brokers aggregate guest RAM independently of worker lifetime |
| `vm-worker-N` | One host-side poller and disposable guest lifecycle per configured slot |
| `container-engine` | Rootful Docker backend when virtualization is explicitly disabled |
| `runner-controller` | One native daemon with configured assignment capacity in container mode |

The controller, preparer and nested engine commands run as root inside the service. The image supports x86_64 and aarch64, includes Git/OpenSSH, and uses filesystem and KVM grants, not a TUN device. KVM is probed by opening its device. Once VM execution is selected, boot or provisioning errors fail the assignment rather than retrying it as a container or using TCG.

Virtualized workers wait for an assignment before requesting a guest. Each assignment gets a new overlay, cloud-init identity and Docker server certificate. No guest runs while its slot is idle. The base disk is read-only to workers. The guest receives its server-authentication key and public CA certificate, never the controller's registration, Docker client private key, CA signing key, filesystem or engine socket. The CA signing key is discarded after issuing the per-guest identities.

The memory broker owns half the service-visible RAM, rounded down to 128 MiB blocks. Admission reserves a 512 MiB boot floor per guest. A lone assignment can borrow the pool; another assignment waits while memory is reclaimed. Only acknowledged QEMU device sizes count as released memory. Busy or pinned pages can delay admission. Guest RAM excludes QEMU, Docker, service and StartOS overhead: this is not a total-RSS limit. Workers do not depend on the broker's SDK daemon lifetime, and handle broker recovery without an SDK-induced job restart.

Per-guest disks use half the available scratch space divided by capacity, capped at 32 GiB and rejected below 8 GiB. A VM disk is not elastic when a build fills it. Independent jobs and matrix entries inside one assignment execute sequentially, recursively through reusable workflows; separate assignments retain configured concurrency.

## Volume and Data Layout

Durable settings and identity live in `main`; rebuildable execution data lives in `scratch`. Controller mounts and guest disks are separate storage boundaries.

| Volume path | Mount and role |
| --- | --- |
| `main/store.json` | Settings; `/data/store.json` in the registration owner |
| `main/runner/.runner` | Authoritative identity; `/data/runner/.runner` for the owner, read-only `/registration/.runner` for controllers |
| `main/runner/registration-revision` | Receipt for a successfully published registration request |
| `main/controller/container` | Private `/data` for the container controller |
| `main/controller/workers/N` | Private `/data` and transport credentials for worker N |
| `scratch/container` | `/scratch` for the engine and controller: Docker layers, runtime socket and job scratch |
| `scratch/vm-images` | Writable `/cache` for the preparer, read-only `/base` for workers |
| `scratch/vm-preparation/{runtime,control}` | Preparer `/vm` and `/data` |
| `scratch/vm-pool` | `/pool` for broker and workers |
| `scratch/vm-workers/N` | Disposable `/vm` disk, seed, guest transport and QEMU state |

Guest Docker bind paths resolve inside the guest. Container mode instead permits the service's job-scratch directory and resolver file; it does not authorize arbitrary controller paths. Job containers in container mode are privileged and share the StartOS kernel, making that mode suitable only for trusted workflows.

## File Models

The package owns settings and registration intent, while the native runner owns the registration format. Hand-edited controller configurations are regenerated rather than treated as authoritative.

- `store.json` is a loose JSON model. Init merges missing defaults, Configure merges settings, and unknown keys survive. Runtime-only edits do not invalidate registration. Registration tokens are single-use requests, not proof of a usable identity; `registrationRevision` distinguishes a fresh request from an already consumed token.
- `runner/.runner` is read without rewriting it. A usable identity needs nonempty UUID/token strings and must not be ephemeral. Its persistent token is different from the token saved in Configure; an empty stored registration token does not invalidate a restored or out-of-band identity.
- `runner/registration-revision` is a plain-text publication receipt. A matching receipt prevents a spent registration token being retried if the identity later disappears.
- `controller/.../runner/rejected-uuid` records server rejection of that controller's identity. It does not delete the authoritative registration; it clears when the controller sees a different UUID.
- Each controller regenerates `runner/config.yaml` in its private `/data`. Labels, capacity, Docker endpoint, source-cache location, narrow bind permissions, local host aliases and provisioning hook are package-managed. The container backend places native Docker proxy sockets in the shared runtime directory, while action-source caches stay private to the controller. Artifact-cache service and configured Gitea client certificate/key fields are disabled. Docker client mTLS credentials are not Gitea client credentials.

The owner holds an exclusive lock on `runner/.runner.lock`. It registers into a request-specific staging file, keeps the old identity on failure, atomically publishes the new identity and then its receipt. A valid stage recovers an interrupted publication without resending the token. Controllers hold a shared original lock and give the native daemon its own private snapshot and exclusive lock. Only the snapshot's forge address changes when the dependency's bridge address changes.

## Dependencies

Gitea is required, running and healthy on its `primary` check. No dependency volume is mounted; the runner resolves Gitea's HTTP bridge address and supplies the server's public CA and local hostname aliases to execution environments.

A task on Gitea enforces Enable Actions. This package does not accept a remote-forge address.

## Network Access and Interfaces

No user-facing interface is exposed. Controllers connect out to Gitea and action/image sources; guest Docker endpoints are loopback mTLS endpoints for their controller, not advertised interfaces.

The public StartOS root CA is installed in controllers, preparers and engines. Job initialization validates CA-only PEM, installs system trust as root before actions, and supplies Node trust through the shared job environment. Local Gitea aliases are installed in controller and engine rootfs as well as job containers, retaining the real HTTPS hostname and verification for action-source clones and job requests. An unrelated certificate authority is not trusted. Arbitrary Docker action images still own their system trust and DNS configuration; the package does not rewrite their images or disable TLS verification.

## Installation and First-Run Flow

Init seeds settings with a hardware-aware virtualization default. New settings use container mode without accessible KVM. If virtualization is already enabled and KVM becomes unavailable, a critical Configure task blocks startup and main refuses to create either backend. Restore KVM access and restart, or explicitly save Configure with Virtualization off to use containers. The saved choice and registration are not automatically changed; the task clears when the selected backend is usable. The service requires at least two visible CPU cores and 1.5 GiB of service-visible memory; VM admission additionally validates capacity against the memory floor and scratch budget.

Registration completes before controllers poll. Guest-image preparation runs before virtualized workers start and is cached by image, architecture, provisioning inputs and public CA fingerprint. Preparation can take several minutes. A restarted idle slot launches only its poller, not an idle guest.

## Actions

Configure changes settings and restarts execution; saving interrupts active assignments. It is safe to repeat for runtime-only changes without a new token. The write is short, but a change that invalidates the guest base requires preparation again.

A fresh token requests registration replacement on startup, not at save time. Replacement can change the runner name and preserves the previous identity until successful publication. A rejected or consumed token is not repaired by repeated restarts; recovery needs an explicitly fresh token. Neither registration nor configuration returns credentials.

## Tasks

A critical Configure task on this service is raised when there is neither a usable persistent identity nor an unconsumed registration request, or when execution settings fail validation. It clears when the watcher can accept the identity/request and settings; it can return if the identity is removed or settings become invalid.

A critical Configure task on Gitea is raised while Enable Actions is off and clears when Actions is enabled. The prompt belongs to the dependency, not this runner's own configuration.

## Health Checks

Checks distinguish daemon readiness from visible assignment progress. VM workers have a five-minute startup grace period; preparation has its own progress check and can outlast that interval before workers start.

- VM image preparation checks its marker and preparing process. Loading means download/install is still active; failure means the preparer failed, died or left invalid state. Inspect `vm-image-preparation` logs and free scratch/network access before retrying.
- The memory-pool check observes the broker process and protocol status. Failure points to `vm-memory-pool`, not necessarily a dead assignment. Inspect broker and worker logs before stopping a live job.
- Each virtualized slot observes its controller, native runner, phase and, while active, QEMU plus authenticated Docker readiness. Idle reports success with no VM allocated. Admission, boot and recycling report loading; running work also reports loading. Hidden daemon readiness maps an active slot to success, preventing task progress from making the service unready.
- The container runner check requires a usable, non-rejected identity, a native runner process and a responding Docker backend. The execution-mode check explains the shared-kernel mode.
- Server rejection is reported against the current authoritative UUID. Inspect the private controller log when registration exists but health fails. Do not delete the original registration to diagnose an engine or boot failure.

## Backups and Restore

Backups copy the `main` volume wholesale using `ofVolumes('main')`, including settings, authoritative registration, receipts and host-controller files. The separate `scratch` volume is deliberately excluded: guest bases, disks, engine layers and job scratch rebuild.

Restored registrations work only while Gitea still recognizes them; restore of this package cannot reconstruct Gitea's runner database. Guest transport identities are regenerated for new assignments. Restoring an older backup runs the execution-data migration without discarding identity or unknown settings.

## Limitations and Differences

1. Only this device's Gitea is supported; there is no remote forge input.
2. Host-execution labels and ephemeral registration are rejected. Docker labels must be unique.
3. VM execution requires accessible KVM and suitable guest firmware/kernel support. Package builds and emulation do not establish native ARM64 KVM coverage; that remains unverified.
4. Guest-memory admission can wait on reclaim; the pool does not cap total process RSS. Capacity also reduces the per-guest disk budget.
5. VM image layers do not survive assignment cleanup. A cached base avoids repeated OS provisioning, not repeated job-image pulls.
6. Recursive serialization is per assignment, not a global limit; independent assignments can contend for CPU, RAM and storage.
7. Container mode is privileged, shares the StartOS kernel and is not equivalent to VM isolation. Both modes require trusted workflow administration.
8. Arbitrary Docker actions may need image-specific trust/DNS configuration. No TLS-verification bypass is supplied.
9. Only x86_64 and aarch64 package architectures are supported.

---

## Quick Reference for AI Consumers

This index names the package's storage and execution surfaces; the sections above describe their lifecycle and guarantees.

```yaml
package_id: gitea-runner
image: ./Dockerfile
architectures: [x86_64, aarch64]
subcontainers:
  - registration-owner
  - vm-image-preparation
  - vm-memory-pool
  - vm-worker-N
  - container-engine
  - runner-controller
volumes:
  main: /data
  scratch: [/scratch, /cache, /base, /vm, /pool]
file_models:
  - store.json
  - runner/.runner
  - runner/registration-revision
  - controller/.../runner/rejected-uuid
startos_managed_env_vars:
  - INSTANCE_URL
  - RUNNER_TOKEN
  - RUNNER_NAME
  - RUNNER_LABELS
  - RUNNER_CAPACITY
  - RUNNER_REGISTRATION_DIR
  - RUNNER_REGISTRATION_REVISION
  - RUNNER_REGISTRATION_PENDING
  - RUNNER_REGISTRATION_RECEIPT
  - RUNNER_ROOT_CA
  - RUNNER_LOCAL_HOSTS
  - RUNNER_BEFORE_JOB
  - RUNNER_SCRATCH_DIR
  - DOCKER_HOST
  - VM_SLOT
  - VM_CAPACITY
  - VM_POOL_MEMORY_MB
  - VM_BOOT_MEMORY_MB
  - VM_MEMORY_BLOCK_MB
  - VM_DISK_GB
  - VM_CPU_CORES
  - VM_DOCKER_PORT
  - VM_GUEST_HOSTNAME
dependencies: [gitea]
interfaces: {}
actions: [configure]
tasks:
  - {package: gitea-runner, action: configure, severity: critical}
  - {package: gitea, action: configure, severity: critical}
health_checks:
  - vm-image
  - memory-pool
  - worker-N
  - jobs-N
  - primary
  - execution-mode
```
