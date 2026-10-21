import { storeJson } from '../fileModels/store.json'
import { sdk } from '../sdk'
import { virtualizationAvailable } from '../utils'

// Seed the store with schema defaults so main.ts and the Configure action
// always read a well-formed object. merge({}) fills missing fields from their
// .catch() defaults and is a no-op on an already-populated store.
export const seedStore = sdk.setupOnInit(async (effects) => {
  const existing = await storeJson.read().once()
  await storeJson.merge(
    effects,
    existing ? {} : { virtualization: await virtualizationAvailable(effects) },
  )
})
