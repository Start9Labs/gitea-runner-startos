import { i18n } from '../i18n'
import { sdk } from '../sdk'
import { storeJson } from '../fileModels/store.json'
import { runnerState } from '../fileModels/runnerState'
import { registrationReceipt } from '../fileModels/registrationReceipt'
import {
  DEFAULT_RUNNER_LABELS,
  MAX_JOB_CAPACITY,
  registrationPending,
  registrationName,
  registrationUsable,
  runnerLabels,
  runnerBackend,
  virtualizationAvailable,
  vmResources,
  vmDiskSize,
} from '../utils'

export const configure = sdk.Action.withInput(
  'configure',
  async () => ({
    name: i18n('Configure'),
    description: i18n(
      'Configure execution without replacing the runner identity. Supply a fresh registration token only to create or replace the registration.',
    ),
    warning: i18n('Saving stops active jobs and restarts the runner.'),
    allowedStatuses: 'any',
    group: null,
    visibility: 'enabled',
  }),
  async ({ effects }) => {
    const available = await virtualizationAvailable(effects)
    const registered = await runnerState.read().once()
    const store = await storeJson.read().once()
    const receipt = await registrationReceipt.read().once()
    const pending = store && registrationPending(store, !!registered, receipt)
    return sdk.InputSpec.of({
      registrationToken: sdk.Value.text({
        name: i18n('Registration Token'),
        description: i18n(
          'Leave blank to keep the existing registration. A fresh token creates or replaces the registration; runtime settings do not require one.',
        ),
        required: !registrationUsable(registered) && !pending,
        default: null,
        masked: true,
      }),
      runnerName: sdk.Value.text({
        name: i18n('Runner Name'),
        description: i18n('A name to identify this runner in the Gitea UI.'),
        required: false,
        default: 'startos-runner',
      }),
      labels: sdk.Value.text({
        name: i18n('Labels'),
        description: i18n(
          'Runner labels must use name:docker://image. Host labels are not allowed.',
        ),
        required: true,
        default: DEFAULT_RUNNER_LABELS,
      }),
      capacity: sdk.Value.number({
        name: i18n('Concurrent Jobs'),
        description: i18n(
          'Maximum concurrent assignments. Reusable-workflow jobs run sequentially within each assignment. VMs share one guest-memory pool; a job may wait for memory.',
        ),
        required: true,
        default: 1,
        min: 1,
        max: MAX_JOB_CAPACITY,
        integer: true,
      }),
      emulation: sdk.Value.toggle({
        name: i18n('Enable Emulation'),
        description: i18n(
          'Also serve jobs for the other CPU architecture, run under emulation (much slower than native). Appends a foreign-architecture label pinned to that platform; prefer a native runner per architecture for regular builds.',
        ),
        default: false,
      }),
      virtualization: sdk.Value.dynamicToggle(async () => ({
        name: i18n('Virtualization'),
        description: i18n(
          'Run each job in a disposable VM with its own guest kernel. Container mode starts faster and uses less memory, but shares the StartOS kernel. VM failures do not switch to container mode.',
        ),
        default: available,
        disabled: available
          ? false
          : i18n(
              'KVM is unavailable. Save with Virtualization off to explicitly use containers that share the StartOS kernel.',
            ),
      })),
    })
  },
  async ({ effects }) => {
    const store = await storeJson.read().once()
    if (!store) return null
    const registered = await runnerState.read().once()
    const receipt = await registrationReceipt.read().once()
    return {
      registrationToken: undefined,
      runnerName: registrationName(store, registered, receipt),
      labels: store.labels,
      capacity: store.capacity,
      emulation: store.emulation,
      virtualization:
        (await virtualizationAvailable(effects)) && store.virtualization,
    }
  },
  async ({ effects, input }) => {
    const store = await storeJson.read().once()
    if (!store) throw new Error(i18n('Store not found'))
    const registered = await runnerState.read().once()
    const receipt = await registrationReceipt.read().once()
    const pending = registrationPending(store, !!registered, receipt)
    const token = input.registrationToken?.trim() || ''
    const previousName = registrationName(store, registered, receipt)
    const name = input.runnerName?.trim() || previousName
    if (!token && registered && name !== previousName) {
      throw new Error(
        i18n('Changing the runner name requires a fresh registration token.'),
      )
    }
    if (!registrationUsable(registered) && !pending && !token) {
      throw new Error(
        i18n('A fresh registration token is required to register this runner.'),
      )
    }
    runnerLabels(input)
    if (
      runnerBackend(
        input.virtualization,
        await virtualizationAvailable(effects),
      ) === 'vm'
    ) {
      vmResources(input.capacity)
      await vmDiskSize(effects, input.capacity)
    }
    await storeJson.merge(effects, {
      registrationToken: token || (pending ? store.registrationToken : ''),
      registrationRevision: store.registrationRevision + (token ? 1 : 0),
      runnerName: name,
      labels: input.labels,
      capacity: input.capacity,
      emulation: input.emulation,
      virtualization: input.virtualization,
    })
    return {
      version: '1',
      title: i18n('Saved'),
      message: i18n('Runner configuration saved.'),
      result: null,
    }
  },
)
