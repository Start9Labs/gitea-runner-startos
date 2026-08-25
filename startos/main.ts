import { cpus, totalmem } from 'os'
import { mainHostId as giteaHostId, uiPort } from 'gitea-startos/startos/utils'
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
        'This device does not meet the minimum requirements to run CI jobs (4 GB of RAM and 2 CPU cores).',
      ),
    )
  }

  const store = await storeJson.read().const(effects)
  if (!store) throw new Error(i18n('Store not found'))

  // The runner connects to its Gitea dependency over the internal LXC bridge.
  // The bridge address (`10.0.3.1:<assigned http port>`) only changes
  // when Gitea's binding does, so this `.const()` restarts main exactly on
  // Gitea install/uninstall/port-change and never on Gitea updates. The
  // `kind:'running'` + primary-health-check dependency means Gitea is up when
  // main starts, so the address resolves and the runner never sees the throw.
  const forgeAddr = await sdk.host
    .getBridgeAddress(effects, {
      packageId: 'gitea',
      hostId: giteaHostId,
      internalPort: uiPort,
      ssl: false,
    })
    .const()
  if (!forgeAddr)
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
    .addOneshot('device-perms', {
      // StartOS 0.4.0.1 and earlier can hand the service root-only /dev/net/tun
      // and /dev/fuse; podman opens both as 'app'.
      subcontainer,
      exec: {
        command: ['chmod', '0666', '/dev/net/tun', '/dev/fuse'],
        user: 'root',
      },
      requires: [],
    })
    .addOneshot('clean-runtime', {
      // XDG_RUNTIME_DIR is on the persistent volume, so the boot ID podman
      // caches there survives a reboot and podman refuses to start against it.
      subcontainer,
      exec: {
        command: ['rm', '-rf', `${DATA_DIR}/runner/run`],
        user: 'root',
      },
      requires: ['own-data'],
    })
    .addDaemon('primary', {
      subcontainer,
      exec: {
        command: ['/usr/local/bin/entrypoint.sh'],
        user: 'app',
        env: {
          INSTANCE_URL: `http://${forgeAddr}`,
          RUNNER_TOKEN: store.registrationToken,
          RUNNER_NAME: store.runnerName || 'startos-runner',
          RUNNER_LABELS: store.labels,
          RUNNER_CAPACITY: String(store.capacity),
          XDG_RUNTIME_DIR: `${DATA_DIR}/runner/run`,
          // podman looks up its subuid/subgid ranges by $USER, which the
          // container inherits as 'root' regardless of the user it runs as.
          USER: 'app',
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
      requires: ['own-data', 'device-perms', 'clean-runtime'],
    })
})
