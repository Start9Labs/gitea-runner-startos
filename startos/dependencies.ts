import { sdk } from './sdk'

// This runner only ever serves the Gitea on this same device — a hard
// dependency. A box that wants its own CI runs its own runner; we don't reach
// across to a remote forge. Gitea must be running AND its web interface
// (the 'primary' health check) reachable, since the runner registers and polls
// over Gitea's HTTP API.
export const setDependencies = sdk.setupDependencies(async ({ effects }) => ({
  gitea: {
    kind: 'running',
    versionRange: '>=1.26.4:1',
    healthChecks: ['primary'],
  },
}))
