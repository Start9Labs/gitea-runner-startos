# Gitea Runner

## Documentation

- [Gitea Actions documentation](https://docs.gitea.com/usage/actions) — upstream reference for workflow syntax, runners, and the Actions admin settings.

## What you get on StartOS

A CI/CD runner that executes Gitea Actions workflows for the **Gitea on this device**. Each job runs in its own isolated, rootless container, and jobs that target another CPU architecture (`arm64`, `riscv64`) run under emulation automatically. The runner has no interface of its own — you see it and its job logs inside Gitea, in its Runners list and the Actions tab.

## Getting set up

This runner serves the Gitea on the same device, so install and start **Gitea** first.

1. In Gitea, create a runner registration token under **Site / Organization / Repository Settings → Actions → Runners → Create new Runner**, and copy it.
2. Run the **Configure** action here and paste the token. Adjust the runner name, labels, and concurrent-jobs count if you like — the default `ubuntu-latest` label runs jobs in a standard Ubuntu image.
3. Start (or restart) the service. It registers with Gitea and begins picking up jobs; it should appear as **Online** in Gitea's Runners.

> Running **Configure** re-registers the runner on the next start, so supply a fresh token each time (registration tokens are single-use).

## Using the Gitea Runner

Once it is online, Gitea dispatches workflow jobs to it automatically — there is nothing to drive here day to day. Follow progress and read job logs in Gitea's **Actions** tab; the service logs here show registration and startup.

### Labels and architecture

A workflow's `runs-on:` is matched against the runner's labels. Add a foreign-architecture label in **Configure** to also serve emulated jobs for that architecture — they work, but are much slower than native, so prefer a separate runner on native hardware for each architecture you build for regularly.

### First run

The first job on each label pulls its container image before anything else runs — the default `ubuntu-latest` image is about 1 GB, so **Set up job** can sit for a minute or two showing only a spinner. The image is cached afterward; later runs start in seconds.

### Checking out your repository

To check out the repository a workflow belongs to, use the standard action — it authenticates automatically with the job's token, so private repositories work with no extra setup:

```yaml
- uses: actions/checkout@v4
```

To clone in a plain `run:` step instead, authenticate with the job's token; the in-job clone URL is anonymous by default and fails on private repositories:

```yaml
- run: git clone "http://ci:${{ github.token }}@${GITHUB_SERVER_URL#*://}/${GITHUB_REPOSITORY}.git" .
```
