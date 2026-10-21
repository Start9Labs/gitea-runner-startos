import { configure } from '../actions/configure'
import { runnerState } from '../fileModels/runnerState'
import { registrationReceipt } from '../fileModels/registrationReceipt'
import { storeJson } from '../fileModels/store.json'
import { i18n } from '../i18n'
import { sdk } from '../sdk'
import {
  registrationPending,
  registrationUsable,
  runnerLabels,
  virtualizationAvailable,
  vmResources,
  vmDiskSize,
} from '../utils'

export const watchConfiguration = sdk.setupOnInit(async (effects) => {
  const registered = await runnerState.read().const(effects)
  const receipt = await registrationReceipt.read().const(effects)
  const store = await storeJson.read().const(effects)
  if (
    !store ||
    (!registrationUsable(registered) &&
      !registrationPending(store, !!registered, receipt))
  ) {
    await sdk.action.createOwnTask(effects, configure, 'critical', {
      reason: i18n(
        'Run the Configure action to connect this runner to a Gitea instance',
      ),
    })
    return
  }
  try {
    runnerLabels(store)
    if (store.virtualization && (await virtualizationAvailable(effects))) {
      vmResources(store.capacity)
      await vmDiskSize(effects, store.capacity)
    }
  } catch (error) {
    if (!(error instanceof Error)) throw error
    await sdk.action.createOwnTask(effects, configure, 'critical', {
      reason: error.message,
    })
    return
  }
  await sdk.action.clearTask(effects, `${sdk.manifest.id}:${configure.id}`)
})
