ARG BINFMT_IMAGE
FROM --platform=$BUILDPLATFORM golang:1.27.3-trixie AS runner
WORKDIR /src
COPY upstream/ ./
COPY patches/ /patches/
RUN for file in /patches/*.patch; do git apply "$file"; done
RUN --mount=type=cache,target=/go/pkg/mod --mount=type=cache,target=/root/.cache/go-build \
    CGO_ENABLED=0 go test -short -run '^Test(RemoteMetadataAndFallbackBoundary|RemoteDockerBuildBoundary|ActionBundleReadWriteBoundary|StepActionLocalTest|StepActionRemote|PatchBundle|PatchActionsAtTheContainerCopy|ExecAsDockerHoldsCloneLockForRemoteUncached|TrustedRootCA|SerialJobs|DefaultParallelJobs|DockerImagePlatform)' ./act/runner \
 && CGO_ENABLED=0 go test -short ./act/container ./internal/app/run ./internal/app/cmd ./internal/pkg/config ./internal/pkg/labels ./internal/app/poll
ARG TARGETOS
ARG TARGETARCH
RUN --mount=type=cache,target=/go/pkg/mod --mount=type=cache,target=/root/.cache/go-build \
    CGO_ENABLED=0 GOOS=$TARGETOS GOARCH=$TARGETARCH go build -trimpath -tags netgo,osusergo \
      -ldflags '-s -w -X gitea.com/gitea/runner/internal/pkg/ver.version=v5.2.2' \
      -o /bin/gitea-runner .
FROM $BINFMT_IMAGE AS binfmt

FROM debian:trixie-slim
ARG BINFMT_IMAGE
COPY node_modules/forgejo-runner-startos/runtime/assets/install-runtime.sh /usr/local/share/ci-runner/install-runtime.sh
RUN sh /usr/local/share/ci-runner/install-runtime.sh
RUN apt-get update && apt-get install -y --no-install-recommends openssh-client && rm -rf /var/lib/apt/lists/*
COPY node_modules/forgejo-runner-startos/runtime/assets/ /usr/local/share/ci-runner/
COPY --from=runner /bin/gitea-runner /usr/local/bin/gitea-runner
COPY --from=binfmt /usr/bin/ /usr/bin/
RUN printf '%s\n' "$BINFMT_IMAGE" > /usr/local/share/binfmt-image
COPY --chmod=755 assets/entrypoint.sh /usr/local/bin/entrypoint.sh
USER app
WORKDIR /home/app
