import { cpus, totalmem } from 'os'
import {
  httpInterfaceId,
  mainHostId as giteaHostId,
} from 'gitea-startos/startos/utils'
import { i18n } from './i18n'
import { sdk } from './sdk'
import { storeJson } from './fileModels/store.json'
import { runnerState } from './fileModels/runnerState'
import { DATA_DIR, MIN_CPU_CORES, MIN_MEMORY_BYTES, mount } from './utils'

export const main = sdk.setupMain(async ({ effects }) => {
  // A CI runner runs full builds (compilers, image pulls, nested containers)
  // per job. Refuse to run on hardware that can't handle it.
  if (totalmem() < MIN_MEMORY_BYTES || cpus().length < MIN_CPU_CORES) {
    throw new Error(
      i18n(
        'This device does not meet the minimum requirements to run CI jobs (2 GiB RAM and 2 CPU cores).',
      ),
    )
  }

  const store = await storeJson.read().const(effects)
  if (!store) throw new Error(i18n('Store not found'))

  // The runner connects to its Gitea dependency over the internal LXC bridge.
  // Resolve Gitea's `http` interface to its stable bridge URL once, outside the
  // daemon chain; `.const()` re-runs main only if that binding is added/removed,
  // so the daemon env gets a plain string instead of the retired `gitea.startos`
  // DNS name (which made the runner watch the Tor/DNS layer).
  const forgeUrl = await sdk.host
    .get(effects, { hostId: giteaHostId, packageId: 'gitea' }, (host) => {
      const iface =
        host &&
        Object.values(host.bindings)
          .flatMap((b) => Object.values(b.interfaces))
          .find((i) => i.id === httpInterfaceId)
      return iface
        ? iface.addressInfo
            .filter({ kind: 'bridge', predicate: (h) => !h.ssl })
            .format('urlstring')[0]
        : undefined
    })
    .const()
  if (!forgeUrl)
    throw new Error(
      i18n(
        'Gitea is not yet reachable on the internal network. The runner will connect once its Gitea dependency is running.',
      ),
    )

  const subcontainer = sdk.SubContainer.of(
    effects,
    { imageId: 'main' },
    mount,
    'gitea-runner-sub',
  )

  return sdk.Daemons.of(effects)
    .addOneshot('own-data', {
      // The runner runs rootless as 'app' (uid 1000); give it ownership of its
      // working area on the persistent volume. StartOS's own store.json at
      // /data is left untouched.
      subcontainer,
      exec: {
        command: [
          'sh',
          '-c',
          `mkdir -p ${DATA_DIR}/runner && chown -R app:app ${DATA_DIR}/runner`,
        ],
        user: 'root',
      },
      requires: [],
    })
    .addDaemon('primary', {
      subcontainer,
      exec: {
        command: ['/usr/local/bin/entrypoint.sh'],
        user: 'app',
        env: {
          INSTANCE_URL: forgeUrl,
          RUNNER_TOKEN: store.registrationToken,
          RUNNER_NAME: store.runnerName || 'startos-runner',
          RUNNER_LABELS: store.labels,
          XDG_RUNTIME_DIR: `${DATA_DIR}/runner/run`,
        },
      },
      ready: {
        display: i18n('Runner'),
        gracePeriod: 60000,
        // Key health off the registration state file, not the store token: a
        // runner registered out-of-band has a live `.runner` but no token here.
        // Poll slowly — registration state is steady, not flapping.
        trigger: sdk.trigger.cooldownTrigger(30000),
        fn: async () =>
          (await runnerState.read().const(effects))
            ? { result: 'success', message: i18n('Runner is registered') }
            : {
                result: 'failure',
                message: i18n(
                  'Run the Configure action to connect this runner to a Gitea instance',
                ),
              },
      },
      requires: ['own-data'],
    })
})
