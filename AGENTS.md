# AGENTS.md

This is a StartOS service-package repository — it builds a `.s9pk` for StartOS.

Develop it inside a StartOS packaging workspace created by `start-cli s9pk init-workspace`,
which provides the packaging guide and agent context one level up. If you're reading this in a
bare clone with no workspace, the full guide is at <https://docs.start9.com/packaging>.

**Start every task at the recipe index** — `../start-technologies/projects/start-sdk/docs/src/recipes.md`
(or <https://docs.start9.com/packaging/recipes.html>). It maps an intent ("prompt the user to create
admin credentials", "expose a web UI") to the constructs, the reference pages, and a named production
package to copy. Find the recipe before you read this package's neighbours: a package you reach by
grepping may be non-conformant, and the recipe outranks it.

Freshly scaffolded? Work the
[New Package Checklist](../start-technologies/projects/start-sdk/docs/src/new-package-checklist.md)
(or <https://docs.start9.com/packaging/new-package-checklist.html>) from top to bottom. It is a
guide page, not a file in this repo — read it, don't copy it in.

Keep `README.md` (technical reference for an AI support or administering agent) and
`instructions.md` (end-user docs) in sync with your changes.

**Bugs and feature requests are GitHub issues on this repo** — file them as you find them.
Don't record work in the repo instead: no `TODO.md`, no `NOTES.md`, no `PLAN.md`. What you
verified, tried, and decided belongs in the commit message and the PR body.

## This repo

- **This package and `forgejo-runner-startos` are siblings but not twins.** Same shape — nested rootless Podman, the same hardware gate, the same `own-data` oneshot — but the registration models differ: Gitea uses a single-use registration token plus a runner name, Forgejo uses a persistent UUID + token pair. Don't port one's credential handling onto the other.
- **Health keys off `runner/.runner`, not the stored token.** A runner registered out of band, or restored from a backup whose token was cleared, is working and has no token here. The state file is ground truth; the token is only an input.
- **Capacity must be applied with `config set`, not a sed.** `gitea-runner config init` writes a _minimal_ config with no `capacity` key at all, so forgejo-runner's `sed -i 's/^  capacity: .*/…/'` has nothing to match here. `config set runner.capacity` is what the generated file itself points at, and `config get` reads the value back.
- **`git` in the image is load-bearing.** The runner fetches `uses:` actions with the git CLI, so without it every `uses:` step fails at fetch time with an exec error rather than anything that names the cause.
- **`clean-runtime` requires `own-data`, not `[]`.** Chain entries with no requirements run concurrently, and `own-data`'s `chown -R` walks the tree `clean-runtime` deletes. Racing them fails the chown with ENOENT, so `own-data` reports failure and retries before it succeeds — log noise for nothing.
- **`own-data` chowns only `runner/`, not the volume root.** StartOS's `store.json` lives at the same mount and must keep its own ownership.
