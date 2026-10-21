# Gitea Runner

## Documentation

- [Gitea Actions documentation](https://docs.gitea.com/usage/actions) — workflows, runners and Actions administration.

## Getting set up

Your runner serves **Gitea on this device**. Have Gitea running with Actions enabled before configuring the runner.

1. In Gitea, create a runner registration token under **Site / Organization / Repository Settings → Actions → Runners → Create new Runner**.
2. Open **Configure** here. Paste the token and choose a runner name, labels and concurrent-job limit. The default label is `ubuntu-latest`.
3. Leave **Virtualization** enabled when available for a separate guest kernel per assignment. Without accessible KVM, new configurations default to containers sharing the StartOS kernel. Use container mode only for trusted workflows.
4. Start the service. First-time VM preparation can take several minutes; watch **VM Image Preparation**. When ready, your runner appears online in Gitea.

For later execution-setting changes, **leave Registration Token blank** to keep your identity. Saving Configure interrupts active jobs and restarts the runner. Supply a fresh token only to create or replace registration, including a name change. A failed replacement keeps the previous identity.

If Gitea no longer recognizes your runner, use Configure with a fresh token. Restarting with a spent token cannot repair registration. A restored identity does not require the old registration token to remain saved.

## Running workflows

Follow runs, logs and artifacts in Gitea's **Actions** tab. Here, an idle virtualized slot reports success without running a VM. Loading means an assignment is waiting for memory, preparing its VM, running or cleaning up. A slot can remain loading while another job releases memory; raising concurrency does not create more RAM.

Reusable-workflow jobs and matrices run sequentially within each assignment. Separate assignments can still overlap up to your configured limit. Guest disks are bounded; if a build fills its disk, reduce concurrent jobs to allow a larger per-guest budget, or reduce the build's storage use.

VM job images are pulled into a fresh guest for each assignment, so image downloads can take time even after the guest base is prepared. Container mode can retain engine image layers between assignments.

### Labels and emulation

Use unique labels in `name:docker://image` format; host-execution labels are not supported. A job's `runs-on` must match a runner label unless it calls a reusable workflow.

Enable **Enable Emulation** in Configure to add the other CPU architecture's label: `linux-arm64` on an x86_64 runner, or `linux-amd64` on an aarch64 runner. Point the corresponding workflow jobs at that label. Emulation is slower than native execution; prefer a native runner per architecture for regular builds.

### Checkout and HTTPS

The built-in checkout action can use your job's token without downloading another action:

```yaml
- uses: builtin:checkout
```

Your job image needs Git; SSH checkout also needs an SSH client. Ordinary jobs receive public StartOS certificate trust and routing for Gitea's local hostname. If you use a custom Docker action image, provide its required certificate trust and DNS configuration in that image or workflow. Do not disable certificate verification to work around a failing connection.

### Choosing container mode

Disabling Virtualization reduces startup cost but removes the separate guest-kernel boundary: privileged job containers share the StartOS kernel. A VM boot or provisioning failure does not switch an assignment to container mode. If KVM becomes unavailable while Virtualization is saved as enabled, the runner stops serving jobs and raises a critical Configure task. Restore KVM access and save Configure with Virtualization on, or save it with Virtualization off to explicitly permit container mode. Registration is preserved. Inspect the failed slot's logs before retrying.
