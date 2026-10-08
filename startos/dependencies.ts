import { configure } from 'gitea-startos/startos/actions/configure'
import { i18n } from './i18n'
import { dependencyDescription } from './manifest/i18n'
import { sdk } from './sdk'

// This runner only ever serves the Gitea on this same device — a hard
// dependency. A box that wants its own CI runs its own runner; we don't reach
// across to a remote forge. Gitea must be running AND its web interface
// (the 'primary' health check) reachable, since the runner registers and polls
// over Gitea's HTTP API.
const gitea = sdk.Dependency.required('gitea', {
  description: dependencyDescription,
  metadata: {
    title: 'Gitea',
    icon: 'https://raw.githubusercontent.com/Start9Labs/gitea-startos/master/icon.svg',
  },
  versionRange: '>=1.27.3:1',
  kind: 'running',
  healthChecks: ['primary'],
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
