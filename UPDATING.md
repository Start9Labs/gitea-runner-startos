# Updating

## Gitea Runner

- **Releases:** <https://gitea.com/gitea/runner/releases>. Confirm the tag's commit with `curl -fsS https://gitea.com/api/v1/repos/gitea/runner/tags/<tag> | jq -r .commit.sha`; upstream's tags are unsigned.
- **Source:** check out the tag in the `upstream/` submodule and stage the gitlink.
- **Version:** set `ver.version=v<version>` in the `Dockerfile`'s `go build` ldflags, and match the `golang:` builder image to the `toolchain` line of upstream's `go.mod`.
- **Patches:** the `Dockerfile` applies every `patches/*.patch` in order with `git apply`, so each must apply to the new tag after the ones before it. Regenerate a patch that no longer applies. Retire one only when the condition in its own "Retire when" line holds upstream.

## Shared runtime

`forgejo-runner-startos` is pinned by commit in `package.json`. Refresh it alongside a release, never as the reason for one, and update `package-lock.json` in the same change.
