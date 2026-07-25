<p align="center">
  <img src="icon.svg" alt="Gitea Runner Logo" width="21%">
</p>

# Gitea Runner on StartOS

> **Upstream docs:** <https://docs.gitea.com/usage/actions>
>
> Everything not listed in this document behaves identically to upstream gitea-runner. If a feature, setting, or behavior is not mentioned here, the upstream documentation is accurate and fully applicable.

[gitea-runner](https://gitea.com/gitea/runner) executes Gitea Actions (CI/CD) workflows. This repository packages it for [StartOS](https://github.com/Start9Labs/start-os/), where it runs each job inside a rootless, nested OCI sandbox and serves the Gitea instance installed on the same device.

---

## Table of Contents

- [Image and Container Runtime](#image-and-container-runtime)
- [Volume and Data Layout](#volume-and-data-layout)
- [Installation and First-Run Flow](#installation-and-first-run-flow)
- [Configuration Management](#configuration-management)
- [Network Access and Interfaces](#network-access-and-interfaces)
- [Actions (StartOS UI)](#actions-startos-ui)
- [Job Execution and Multi-Arch](#job-execution-and-multi-arch)
- [Backups and Restore](#backups-and-restore)
- [Health Checks](#health-checks)
- [Dependencies](#dependencies)
- [Limitations and Differences](#limitations-and-differences)
- [What Is Unchanged from Upstream](#what-is-unchanged-from-upstream)
- [Contributing](#contributing)
- [Quick Reference for AI Consumers](#quick-reference-for-ai-consumers)

---

## Image and Container Runtime

| Aspect        | Standard install                                                 | StartOS                                                                                                                                                              |
| ------------- | ---------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Image         | The `gitea-runner` binary plus a Docker/Podman socket you supply | Custom image: Debian + rootless **Podman** and **git** (used to fetch `uses:` actions), with the `gitea-runner` binary copied from the official `gitea/runner` image |
| Architectures | depends on host                                                  | x86_64, aarch64                                                                                                                                                      |
| Job engine    | an external Docker/Podman daemon you wire up                     | a rootless Podman engine bundled inside the service (`userspaceFilesystems` + `virtualNetworking`)                                                                   |
| Entrypoint    | `gitea-runner daemon`                                            | a wrapper that starts the Podman socket, writes your configured labels into `config.yaml`, registers once, then runs `gitea-runner daemon`                           |

Upstream expects you to provide a container engine; this package bundles a rootless Podman engine so each CI job is sandboxed without privileged Docker-in-Docker.

## Volume and Data Layout

| Aspect              | StartOS                                                                                                                                     |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| Primary volume      | Single managed volume `main`, mounted at `/data`                                                                                            |
| Runner working area | `/data/runner` — the generated `config.yaml`, the `.runner` registration state, and the Podman layer store (so job images survive restarts) |
| StartOS settings    | `/data/store.json` — registration token, runner name, labels, and concurrency (see [Configuration Management](#configuration-management))   |

## Installation and First-Run Flow

The runner does nothing until it is connected to a Gitea instance.

1. On start, the entrypoint brings up the rootless Podman socket and generates a default `config.yaml`.
2. If no registration token is configured, the service stays up but idle and prompts you to run **Configure**.
3. Once configured, it registers once (idempotent via the `.runner` state file) and runs the runner daemon, which long-polls Gitea for jobs.

## Configuration Management

Upstream `gitea-runner` is configured through `config.yaml` and `register` flags. On StartOS you set the connection through the **Configure** action; values persist in `store.json` and are applied on each start.

| Setting            | Managed via                                                                           |
| ------------------ | ------------------------------------------------------------------------------------- |
| Registration token | "Configure" action                                                                    |
| Runner name        | "Configure" action                                                                    |
| Labels             | "Configure" action — written into `config.yaml`, where gitea-runner reads them        |
| Concurrent jobs    | "Configure" action                                                                    |
| Forge URL          | Always the local Gitea, resolved from its HTTP interface over the internal LXC bridge |

## Network Access and Interfaces

**None.** The runner makes only outbound connections — it long-polls Gitea for jobs and pulls job images — and exposes no inbound interface. View its status and job logs inside Gitea (its Runners list and the Actions tab), plus the StartOS service logs.

## Actions (StartOS UI)

| Action    | Visibility | Availability | Purpose                                                          |
| --------- | ---------- | ------------ | ---------------------------------------------------------------- |
| Configure | Visible    | Any          | Set the registration token, runner name, labels, and concurrency |

### Configure

- **Inputs:** Registration token (required), runner name, labels, concurrent jobs
- **Outputs:** None — restart the service to apply
- Each run drops the existing registration so the next start re-registers with the new settings. Registration tokens are single-use, so provide a fresh one each time.

## Job Execution and Multi-Arch

Each job runs in its own container via the bundled rootless Podman engine. StartOS registers QEMU `binfmt` handlers host-wide, so a job targeting a foreign architecture (`arm64`, `riscv64`, …) runs under emulation automatically — no per-container setup. Emulated builds are much slower than native; for regular multi-arch work, prefer a native runner per architecture and reserve emulation for architectures you have no native hardware for.

The runner image ships `git`, which the daemon shells out to when fetching `uses:` actions (such as `actions/checkout`); without it every `uses:` step would fail at the action fetch. The first job for a given image tag also pulls that image (~1 GB for the default `ubuntu-latest`), so its initial **Set up job** step can take a minute or two before the image is cached locally.

## Backups and Restore

| Aspect  | StartOS                                                                                                      |
| ------- | ------------------------------------------------------------------------------------------------------------ |
| Scope   | Full `/data` volume — `store.json`, the runner config, registration state, and cached job images             |
| Restore | The volume is fully restored before the service starts; the runner reconnects with its existing registration |

## Health Checks

| Aspect       | StartOS                                                                                                              |
| ------------ | -------------------------------------------------------------------------------------------------------------------- |
| Method       | Reflects registration state, displayed as "Runner"                                                                   |
| Grace period | 60 seconds                                                                                                           |
| Behavior     | Healthy once the runner has registered (its `.runner` state file exists); otherwise prompts you to run **Configure** |

## Dependencies

| Dependency | Required?          | Purpose                                                                                                                                         |
| ---------- | ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| **Gitea**  | Required (running) | The forge this runner serves. The runner registers and long-polls over Gitea's HTTP API, so Gitea's web-interface health check must be passing. |

This runner serves only the Gitea on the same device — there is no remote-forge mode.

## Limitations and Differences

1. **Local forge only** — registers against the Gitea on this device; there is no remote-instance option.
2. **No inbound interface** — outbound-only; status and logs are viewed in Gitea, not in a runner UI.
3. **Labels come from `config.yaml`** — gitea-runner reads runner labels from `config.yaml`, so the package writes the labels you set in **Configure** into the generated config, replacing the image's defaults.
4. **Emulated foreign-arch jobs are slow** — a native runner per architecture is preferred for regular multi-arch builds.

## What Is Unchanged from Upstream

Everything not listed above behaves as documented at <https://docs.gitea.com/usage/actions/overview> — workflow syntax, the `register`/`daemon` behavior, label matching, and job execution semantics.

## Contributing

Build and development workflow follow the StartOS packaging guide: <https://docs.start9.com/packaging>. Keep `README.md`, `instructions.md`, and `AGENTS.md` in sync with any change to user-visible behavior or package structure.

---

## Quick Reference for AI Consumers

```yaml
package_id: gitea-runner
image: custom (Debian + rootless Podman + git + gitea-runner)
architectures: [x86_64, aarch64]
volumes:
  main: /data
ports: none
dependencies:
  - gitea (required, running)
startos_managed_env_vars:
  - INSTANCE_URL
  - RUNNER_TOKEN
  - RUNNER_NAME
  - RUNNER_LABELS
  - XDG_RUNTIME_DIR
actions:
  - configure
```
