import { FileHelper, z } from '@start9labs/start-sdk'
import { sdk } from '../sdk'
import { DEFAULT_RUNNER_LABELS, MAX_JOB_CAPACITY } from '../utils'

const shape = z.looseObject({
  registrationToken: z.string().catch(''),
  registrationRevision: z.number().int().nonnegative().catch(0),
  runnerName: z.string().catch(''),
  labels: z.string().catch(DEFAULT_RUNNER_LABELS),
  capacity: z.number().int().min(1).max(MAX_JOB_CAPACITY).catch(1),
  emulation: z.boolean().catch(false),
  virtualization: z.boolean().catch(true),
})

export const storeJson = FileHelper.json(
  { base: sdk.volumes.main, subpath: './store.json' },
  shape,
)
