import { sdk } from './sdk'

// ---- Resource gate ----
// A CI runner only makes sense on a box with real headroom: every job runs a
// full build (compilers, image pulls, nested containers). These are the floor
// below which we refuse to run; enforced in main.ts via node:os.
export const MIN_MEMORY_BYTES = 2 * 1024 ** 3 // 2 GiB
export const MIN_CPU_CORES = 2

// ---- Paths (inside the service container) ----
export const DATA_DIR = '/data'

export const mount = sdk.Mounts.of().mountVolume({
  volumeId: 'main',
  subpath: null,
  mountpoint: DATA_DIR,
  readonly: false,
})
