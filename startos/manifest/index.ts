import { setupManifest } from '@start9labs/start-sdk'
import { long, short } from './i18n'
import { BINFMT_IMAGE } from 'forgejo-runner-startos/runtime'

export const manifest = setupManifest({
  id: 'gitea-runner',
  title: 'Gitea Runner',
  license: 'MIT',
  packageRepo: 'https://github.com/Start9Labs/gitea-runner-startos',
  upstreamRepo: 'https://gitea.com/gitea/runner',
  marketingUrl: 'https://gitea.com/',
  donationUrl: null,
  description: { short, long },
  volumes: ['main', 'scratch'],
  images: {
    main: {
      source: { dockerBuild: { workdir: '.', buildArgs: { BINFMT_IMAGE } } },
      arch: ['x86_64', 'aarch64'],
      emulateMissing: false,
    },
  },
  userspaceFilesystems: true,
  virtualNetworking: false,
  hardwareVirtualization: true,
})
