import { configure } from 'gitea-startos/startos/actions/configure'
import { storeJson } from './fileModels/store.json'
import { i18n } from './i18n'
import { dependencyDescription } from './manifest/i18n'
import { sdk } from './sdk'

const gitea = sdk.Dependency.optional('gitea', {
  description: dependencyDescription,
  metadata: {
    title: 'Gitea',
    icon: 'https://raw.githubusercontent.com/Start9Labs/gitea-startos/master/icon.svg',
  },
  versionRange: '>=1.27.3:1',
  kind: 'running',
  healthChecks: ['primary'],
  enabled: async ({ effects }) =>
    !(await storeJson.read((s) => s.remoteUrl).const(effects)),
}).withInit(async (effects) => {
  await sdk.action.createTask(effects, 'gitea', configure, 'critical', {
    input: {
      kind: 'partial',
      accept: [{ GITEA__actions__ENABLED: true }],
      set: { GITEA__actions__ENABLED: true },
    },
    reason: i18n('Gitea Actions must be enabled for Gitea Runner to run jobs.'),
    when: { condition: 'input-not-matches', once: false },
  })
})

export const dependencies = sdk.Dependencies.of().addDependency(gitea)
