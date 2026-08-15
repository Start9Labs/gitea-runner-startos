<p align="center">
  <img src="icon.svg" alt="Gitea Runner Logo" width="21%">
</p>

# Gitea Runner on StartOS

> Everything not listed in this document should behave the same as upstream
> Gitea Runner. If a feature, setting, or behavior is not mentioned here, the
> upstream documentation is accurate and fully applicable — see the
> Documentation section of `instructions.md` for links.

[Gitea Runner](https://gitea.com/gitea/runner) executes Gitea Actions workflows. This package runs it against the Gitea on this same device, with a rootless Podman engine inside the service so each job gets its own container.

- **Upstream repo:** <https://gitea.com/gitea/runner>
- **Wrapper repo:** <https://github.com/Start9Labs/gitea-runner-startos>

---

## Table of Contents

- [Image and Container Runtime](#image-and-container-runtime)
- [Volume and Data Layout](#volume-and-data-layout)
- [File Models](#file-models)
- [Dependencies](#dependencies)
- [Network Access and Interfaces](#network-access-and-interfaces)
- [Installation and First-Run Flow](#installation-and-first-run-flow)
- [Actions](#actions)
- [Health Checks](#health-checks)
- [Backups and Restore](#backups-and-restore)
- [Limitations and Differences](#limitations-and-differences)
- [Quick Reference for AI Consumers](#quick-reference-for-ai-consumers)

---

## Image and Container Runtime

The image is built here: upstream's runner binary is copied onto a Debian base carrying a rootless container engine, because the runner needs somewhere to run each job.

| Property      | Value                                                                  |
| ------------- | ---------------------------------------------------------------------- |
| Image         | Built from `Dockerfile` — upstream's `gitea-runner` binary plus Podman |
| Architectures | x86_64, aarch64                                                        |
| Command       | The repo's `entrypoint.sh`, run as the unprivileged `app` user         |
| Subcontainer  | `gitea-runner-sub` — the `primary` daemon, and the one to `attach` to  |

The manifest declares two device grants that this arrangement requires: **userspace filesystems** for the storage driver, and **virtual networking** for job networking. Without either, the nested engine cannot start a job container. The image also carries `git`, because the runner fetches `uses:` actions with the git CLI and every such step fails without it.

Two oneshots run as root before the daemon. `own-data` creates the runner's working directory on the volume and hands it to `app`, leaving the rest of the volume alone. `device-perms` re-opens `/dev/net/tun` and `/dev/fuse` to mode 0666: StartOS 0.4.0.1 and earlier can create those granted nodes root-only, and the engine opens both as the unprivileged user. It is idempotent and becomes a no-op once the OS-side fix ships.

## Volume and Data Layout

One volume, shared between the package's state and the runner's working area.

| Volume | Mount Point | Purpose                                                                                                  |
| ------ | ----------- | -------------------------------------------------------------------------------------------------------- |
| `main` | `/data`     | `store.json`, and the runner's working directory under `runner/` — including its registration state file |

## File Models

Two models. One is what you supply; the other is the runner's own registration state, which the package only ever reads.

| File             | Format | Modelled                | Written by                           |
| ---------------- | ------ | ----------------------- | ------------------------------------ |
| `store.json`     | JSON   | Yes — `FileHelper.json` | Every init, and the Configure action |
| `runner/.runner` | JSON   | Read-only               | The runner itself, when it registers |

| Key                 | Notes                                                                            |
| ------------------- | -------------------------------------------------------------------------------- |
| `registrationToken` | A **single-use** token from Gitea's Create-new-Runner screen                     |
| `runnerName`        | How the runner identifies itself in Gitea; defaults to `startos-runner`          |
| `labels`            | Comma-separated, in the runner's own `name:docker://image` or `name:host` syntax |
| `capacity`          | How many jobs run at once                                                        |

`store.json` strips keys it does not declare, and nothing else writes it. Everything else reaches the runner as environment on each start, including the connection to Gitea — whose address is resolved rather than stored.

`USER` is set to the unprivileged account the daemon runs as, not left at the container's inherited `root`. The container engine resolves its subordinate UID and GID ranges by `$USER`, and finding none for `root` it falls back to a single-ID mapping — under which any job image carrying a file not owned by root fails to unpack.

**`runner/.runner` is the ground truth for whether this runner is registered**, and it is why the health check does not simply look at whether a token is stored. A runner registered out of band, or restored from a backup whose stored token was cleared, is fully working while carrying no token here; the state file reflects that and the token does not.

## Dependencies

One, and it is required in the strong sense.

| Dependency | Kind      | Health check | Mounts | Why                                            |
| ---------- | --------- | ------------ | ------ | ---------------------------------------------- |
| Gitea      | `running` | `primary`    | none   | The forge this runner registers with and polls |

The health check is required as well as "running", because the runner talks to Gitea's HTTP API — a Gitea that is up but not yet serving is no use to it.

**This runner only ever serves the Gitea on this device.** The address is resolved from Gitea's own binding over the service bridge; there is no field for a remote forge. If Gitea is not reachable, `main` refuses to start with a message saying so rather than starting a runner that cannot register.

## Network Access and Interfaces

None. The runner dials out to its forge and pulls job images; it accepts no inbound connections and exports nothing.

## Installation and First-Run Flow

Install seeds the store with defaults and nothing else. There is no task, and the service starts — but it will not do any work until you register it.

Two gates apply before that, both enforced rather than advisory:

1. **Hardware.** `main` refuses to start on a device below 2 CPU cores or roughly a 4 GB machine's worth of memory, because every job is a full build. The message says so explicitly rather than failing obscurely later.
2. **Gitea.** It must be installed and serving.

Then run [Configure](#actions) with a registration token from Gitea's **Settings → Actions → Runners → Create new Runner**, and restart. Registration happens on that restart, at which point the runner writes its state file and the health check turns green.

## Actions

One action.

### Configure

Registers the runner with Gitea and sets how it advertises itself.

- **What it changes:** every field in `store.json` — the registration token, name, labels, and concurrency.
- **Cost:** the write is instant, but **registration happens on the next restart**, not on save.
- **Repeat safety:** re-running is safe, but **a registration token is single-use.** Saving re-registers on the next restart, so a second run needs a _fresh_ token from Gitea; reusing the old one fails to register.
- **Input notes:** labels use the runner's own syntax. A foreign-architecture label here also serves emulated jobs, which run far slower than native ones — a second runner on the other architecture is the better arrangement for regular builds.

## Health Checks

One check, and it reports registration rather than liveness.

| Check              | Method                                              | Grace Period |
| ------------------ | --------------------------------------------------- | ------------ |
| `primary` "Runner" | Whether the runner's registration state file exists | 60 seconds   |

It polls slowly, because the thing it reports changes only at registration. A failure means the runner has not registered — it names the action to run. A pass means it has; whether Gitea is currently handing it jobs is visible in Gitea, not here.

## Backups and Restore

The `main` volume is copied wholesale — `sdk.Backups.ofVolumes('main')`. No dump step and nothing excluded.

- **Included:** the store, and the runner's working directory with its registration state file.
- **Restore:** the runner comes back registered, because the state file travels with the backup. Whether Gitea still recognises that registration depends on Gitea's own state, which is that package's backup rather than this one's — if the forge was rebuilt, register again with a fresh token.

## Limitations and Differences

1. **Only the Gitea on this device.** There is no field for a remote forge; the address is resolved from the local dependency.
2. **Registration tokens are single-use.** Re-running Configure needs a new one from Gitea.
3. **Configuration applies on restart**, not immediately.
4. **The service refuses to start on small hardware** — under 2 cores or roughly a 4 GB machine.
5. **Emulated jobs are much slower than native**, and are opted into by adding a foreign-architecture label by hand.
6. **Jobs run in a rootless engine inside the service**, which requires the two device grants named above, and on StartOS 0.4.0.1 and earlier a startup step to make those device nodes readable by the unprivileged user.
7. **No riscv64 build.** x86_64 and aarch64 only.

---

## Quick Reference for AI Consumers

```yaml
package_id: gitea-runner
image: ./Dockerfile # upstream's runner binary plus rootless Podman on Debian
architectures:
  - x86_64
  - aarch64
subcontainers:
  - gitea-runner-sub
volumes:
  main: /data
file_models:
  - store.json
  - runner/.runner # read-only; the runner's own registration state
startos_managed_env_vars:
  - INSTANCE_URL
  - RUNNER_TOKEN
  - RUNNER_NAME
  - RUNNER_LABELS
  - RUNNER_CAPACITY
  - XDG_RUNTIME_DIR
  - USER
dependencies:
  - gitea # required; gated on its primary health check
interfaces: {} # none; the runner accepts no inbound connections
actions:
  - configure
tasks: []
health_checks:
  - primary # displayed "Runner"; reports whether the runner has registered
```
