# AGENTS.md

This is a StartOS service-package repository — it builds a `.s9pk` for StartOS.

Develop it inside a StartOS packaging workspace created by `start-cli s9pk init-workspace`,
which provides the packaging guide and agent context one level up. If you're reading this in a
bare clone with no workspace, the full guide is at <https://docs.start9.com/packaging>.

Work this package's `TODO.md` from top to bottom. Keep `README.md` (technical reference for an AI support or administering agent) and `instructions.md` (end-user docs) in sync with your changes.

## This repo

- **This package and `forgejo-runner-startos` are siblings but not twins.** Same shape — nested rootless Podman, the same hardware gate, the same `own-data` oneshot — but the registration models differ: Gitea uses a single-use registration token plus a runner name, Forgejo uses a persistent UUID + token pair. Don't port one's credential handling onto the other.
- **Health keys off `runner/.runner`, not the stored token.** A runner registered out of band, or restored from a backup whose token was cleared, is working and has no token here. The state file is ground truth; the token is only an input.
- **Capacity must be applied with `config set`, not a sed.** `gitea-runner config init` writes a _minimal_ config with no `capacity` key at all, so forgejo-runner's `sed -i 's/^  capacity: .*/…/'` has nothing to match here. `config set runner.capacity` is what the generated file itself points at, and `config get` reads the value back.
- **`git` in the image is load-bearing.** The runner fetches `uses:` actions with the git CLI, so without it every `uses:` step fails at fetch time with an exec error rather than anything that names the cause.
- **`own-data` chowns only `runner/`, not the volume root.** StartOS's `store.json` lives at the same mount and must keep its own ownership.
