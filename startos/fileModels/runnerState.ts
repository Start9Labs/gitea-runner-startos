import { FileHelper, z } from '@start9labs/start-sdk'
import { sdk } from '../sdk'

// The runner's registration state file, written into the working directory by
// `register`. We only ever READ it: its presence is the ground truth that this
// runner has registered with a forge — which is what the health check keys off,
// rather than the store token. A runner registered out-of-band (or restored
// from a backup whose store token was cleared) carries no token in our store
// yet is fully working; `.runner` reflects that, the token doesn't. Schema is
// permissive — only the file's existence matters here.
export const runnerState = FileHelper.json(
  { base: sdk.volumes.main, subpath: './runner/.runner' },
  z.looseObject({}),
)
