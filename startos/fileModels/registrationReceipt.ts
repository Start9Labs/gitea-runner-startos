import { FileHelper, z } from '@start9labs/start-sdk'
import { sdk } from '../sdk'
import { REGISTRATION_RECEIPT_SUBPATH } from '../utils'

export const registrationReceipt = FileHelper.string(
  { base: sdk.volumes.main, subpath: REGISTRATION_RECEIPT_SUBPATH },
  z.string(),
)
