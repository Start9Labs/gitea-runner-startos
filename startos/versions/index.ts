import { VersionGraph } from '@start9labs/start-sdk'
import { current } from './current'
import { v_5_2_0_0 } from './v5.2.0_0'

export const versionGraph = VersionGraph.of({
  current,
  other: [v_5_2_0_0],
})
