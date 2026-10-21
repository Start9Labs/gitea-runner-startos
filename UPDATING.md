# Updating

## Gitea Runner

- **Find releases:** <https://gitea.com/gitea/runner/releases>. The `upstream/` gitlink pins source; the image builds it rather than copying an official runner binary.
- **Apply a bump:** fetch the intended upstream tag into the submodule, verify its commit, and stage that gitlink in the package. Match the version embedded by `Dockerfile` and the upstream portion in `startos/versions/current.ts`.
- **Review patches:** apply all `patches/*.patch` sequentially to clean pinned source. Remove one only when upstream has equivalent semantics and regression coverage, not merely a similar helper.
- **Verify source:** read upstream's `AGENTS.md` and `DEVELOPMENT.md`, run `make fmt`, `make checks`, `make lint-go`, and relevant tests on the patched source. Broad runner tests need a live, isolated Docker fixture; a daemon-free build cannot establish that suite passed. Use a supported patched Go compiler and run its vulnerability checks. Do not weaken tests or linters.
- **Release metadata:** follow the guide's version-graph rules. A migration stays with its introducing version; spin it out only when a later bump replaces a nonempty `up`. Preserve all five locale notes and the root application's MIT license.

### Patch retirement gates

1. `0001-prepare-assigned-job`: the task reporter must be live during the host preparation hook, before Docker access, with cancellation/failure propagation. Native `daemon --once` must wait for one assignment without requiring an idle guest.
2. `0002-confine-action-source-files`: metadata, fallback files, JavaScript compatibility patches, Docker contexts and ignore files remain rooted; synthetic local-action files go through the container API. Test symlink reads and writes, not just traversal strings.
3. `0003-isolate-job-action-caches`: each assignment gets a private source-cache directory and cleans it on return. Clone locks alone do not remove stale-lock or cross-assignment state.
4. `0004-install-trusted-root-ca`: reject malformed, empty, private-key and non-CA inputs; install system/Node trust before actions as root. Preserve the real HTTPS hostname and reject an unrelated CA.
5. `0005-serialize-assigned-task-jobs`: bound both job and matrix fan-outs, recursively through reusable workflows. A global semaphore around reusable callers can deadlock; assert per-assignment serialization and independent assignment overlap.
6. `0006-select-label-image-platform`: strip platform queries from Docker image names, preserve label roundtrips and select platform per evaluated job, including matrix, services, action containers and builds.
7. `0007-ignore-shared-network-host-options`: Docker actions sharing a job network must not inherit its `--add-host` options; Docker rejects that combination. Preserve aliases on ordinary job containers and keep custom action trust/DNS image-specific.

## Shared execution runtime

The npm dependency pins an immutable `forgejo-runner-startos` commit. Its `runtime/` owns the memory/disk/label policy, VM/engine assets, host binfmt pin, public CA installation and health probes. Update the dependency and lockfile together; do not copy those implementations or immutable digests here. Preserve its license asset in the runtime image.

Keep the runtime directory in Docker's allowlist, NCC's `tsconfig.json` include, and the JavaScript target's Make dependencies. Pass the shared `BINFMT_IMAGE` export through manifest build arguments. The shared runtime's `README.md` documents the adapter contract; its `UPDATING.md` documents cloud image, hotplug-kernel and binfmt refresh verification.

Gitea's single-use registration request remains package-specific. Verify a restored identity with an empty stored token, runtime-only edits, replacement failure, interruption between staged publication and receipt, and refusal to retry a consumed token. Controllers use read-only authoritative registration plus native-lockable private snapshots; do not remove the native lifetime lock to enable parallel pollers. Prove compatibility against a real Gitea server with two active assignments and an idle peer restart.

## Package verification

Build both x86_64 and aarch64 packages and inspect the returned artifacts, including runner architecture/compiler, runtime asset bytes, symlinks, executable modes, helper pin and license. Test an ordinary action, a Docker action, foreign-architecture work, artifacts and recursive reusable workflows in both execution modes on an owned isolated fixture.

Exercise zero idle guests, distinct guest identities, acknowledged memory reclaim under pressure, cancellation while waiting/booting/running, broker restart without assignment restart, VM preparation failures and idle-success/active-loading health. Confirm source/credential boundaries and local HTTPS trust without certificate bypasses. Native ARM64 KVM requires native hardware; successful builds or emulation are not that evidence.

Upgrade a registered legacy package and restore a legacy backup. Preserve `.runner`, store ownership, unknown settings and unrelated content while discarding only old Podman layers/runtime state. Confirm the scratch volume is excluded from backups. Update `README.md` and `instructions.md` when behavior changes.
