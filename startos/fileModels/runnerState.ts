import { FileHelper, z } from '@start9labs/start-sdk'
import { sdk } from '../sdk'

// `registrationUsable` validates identity fields without rewriting the registration.
export const runnerState = FileHelper.json(
  { base: sdk.volumes.main, subpath: './runner/.runner' },
  z.looseObject({}),
)
