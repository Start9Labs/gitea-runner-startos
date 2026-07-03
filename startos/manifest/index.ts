import { setupManifest } from '@start9labs/start-sdk'
import { dependencyDescription, long, short } from './i18n'

export const manifest = setupManifest({
  id: 'gitea-runner',
  title: 'Gitea Runner',
  license: 'MIT',
  packageRepo: 'https://github.com/Start9Labs/gitea-runner-startos',
  upstreamRepo: 'https://gitea.com/gitea/runner',
  marketingUrl: 'https://gitea.com/',
  donationUrl: null,
  description: { short, long },
  volumes: ['main'],
  images: {
    main: {
      source: { dockerBuild: { workdir: '.' } },
      arch: ['x86_64', 'aarch64'],
    },
  },
  dependencies: {
    gitea: {
      description: dependencyDescription,
      optional: false,
      metadata: {
        title: 'Gitea',
        icon: 'https://raw.githubusercontent.com/Start9Labs/gitea-startos/master/icon.svg',
      },
    },
  },
  // Run a rootless Podman engine inside the service to sandbox each CI job.
  // It needs both device grants the former nestedRuntime flag bundled:
  // userspaceFilesystems for /dev/fuse (fuse-overlayfs storage) and
  // virtualNetworking for /dev/net/tun (slirp4netns job networking).
  // See start-docs recipe-nested-oci-runtime.
  userspaceFilesystems: true,
  virtualNetworking: true,
})
