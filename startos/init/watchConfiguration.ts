import { configure } from '../actions/configure'
import { runnerState } from '../fileModels/runnerState'
import { storeJson } from '../fileModels/store.json'
import { i18n } from '../i18n'
import { sdk } from '../sdk'

export const watchConfiguration = sdk.setupOnInit(async (effects) => {
  const registered = await runnerState.read().const(effects)
  const store = await storeJson.read().const(effects)

  if (!registered && !store?.registrationToken) {
    await sdk.action.createOwnTask(effects, configure, 'critical', {
      reason: i18n(
        'Run the Configure action to connect this runner to a Gitea instance',
      ),
    })
  } else {
    await sdk.action.clearTask(effects, `${sdk.manifest.id}:${configure.id}`)
  }
})
