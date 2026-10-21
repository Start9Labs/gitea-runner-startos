import { sdk } from './sdk'
import { i18n } from './i18n'
import {
  KVM_PROBE,
  guestDiskGiB,
  guestResources,
  resolveRunnerLabels,
} from 'forgejo-runner-startos/runtime'

export {
  DEFAULT_RUNNER_LABELS,
  EMULATION_IMAGE,
  ROOT_CA_PATH,
  installRootCa,
  installLocalHosts,
} from 'forgejo-runner-startos/runtime'

// ---- Resource gate ----
// A CI runner only makes sense on a box with real headroom: every job runs a
// full build (compilers, image pulls, nested containers). These are the floor
// below which we refuse to run; enforced in main.ts via node:os.
// Means "a 4 GB machine or better". os.totalmem() here is what StartOS grants
// service containers -- host MemTotal less its 1 GiB reserve -- so a 4 GB machine
// reports ~2.8 GiB and a 2 GB one ~0.8 GiB. 1.5 GiB sits between them.
export const MIN_MEMORY_BYTES = 1.5 * 1024 ** 3
export const MIN_CPU_CORES = 2
export const MAX_JOB_CAPACITY = 64

// ---- Paths (inside the service container) ----
export const DATA_DIR = '/data'
export const SCRATCH_DIR = '/scratch'
export const REGISTRATION_DIR = `${DATA_DIR}/runner`
export const REGISTRATION_RECEIPT_SUBPATH = './runner/registration-revision'
export const REGISTRATION_RECEIPT = `${DATA_DIR}/${REGISTRATION_RECEIPT_SUBPATH.slice(2)}`
export const JOB_SCRATCH_DIR = `${SCRATCH_DIR}/jobs`
export const RUNTIME_DIR = `${SCRATCH_DIR}/run`
export const DOCKER_HOST = `unix://${RUNTIME_DIR}/docker.sock`

export type RunnerSettings = {
  registrationToken: string
  registrationRevision: number
  runnerName: string
  labels: string
  capacity: number
  emulation: boolean
  virtualization: boolean
}

export function registrationPending(
  settings: Pick<RunnerSettings, 'registrationToken' | 'registrationRevision'>,
  registered: boolean,
  receipt: string | null | undefined,
) {
  if (!settings.registrationToken) return false
  return settings.registrationRevision > 0
    ? String(settings.registrationRevision) !== receipt?.trim()
    : !registered && receipt?.trim() !== '0'
}

export function registrationUsable(
  registered:
    | { uuid?: unknown; token?: unknown; ephemeral?: unknown }
    | null
    | undefined,
) {
  return (
    !!registered &&
    typeof registered.uuid === 'string' &&
    registered.uuid.length > 0 &&
    typeof registered.token === 'string' &&
    registered.token.length > 0 &&
    (registered.ephemeral === undefined ||
      registered.ephemeral === null ||
      registered.ephemeral === false)
  )
}

export function registrationHealth(
  registered:
    | { uuid?: unknown; token?: unknown; ephemeral?: unknown }
    | null
    | undefined,
  rejected: string | null | undefined,
) {
  if (!registrationUsable(registered)) {
    return {
      result: 'failure',
      message: i18n('The runner is not registered'),
    } as const
  }
  if (
    typeof registered?.uuid === 'string' &&
    rejected?.trim() === registered.uuid
  ) {
    return {
      result: 'failure',
      message: i18n(
        'Gitea no longer recognizes this runner. Use Configure with a fresh registration token.',
      ),
    } as const
  }
  return null
}

export function registrationName(
  settings: Pick<
    RunnerSettings,
    'registrationToken' | 'registrationRevision' | 'runnerName'
  >,
  registered: { name?: unknown } | null | undefined,
  receipt: string | null | undefined,
) {
  if (
    !registrationPending(settings, !!registered, receipt) &&
    typeof registered?.name === 'string'
  ) {
    return registered.name
  }
  return settings.runnerName || 'startos-runner'
}

export function runnerLabels(
  settings: Pick<RunnerSettings, 'labels' | 'emulation'>,
) {
  const resolved = resolveRunnerLabels(settings)
  if (resolved.error) throw new Error(i18n(resolved.error))
  return resolved.labels
}

export async function virtualizationAvailable(
  effects: Parameters<typeof sdk.SubContainer.of>[0],
) {
  const result = await sdk.SubContainer.withTemp(
    effects,
    { imageId: 'main' },
    sdk.Mounts.of(),
    'virtualization-availability',
    (sub) =>
      sub.exec(['sh', '-ec', KVM_PROBE], { user: 'root', timeout: 5000 }),
  )
  return result.exitCode === 0
}

export function vmResources(capacity: number) {
  const resources = guestResources(capacity)
  if (!resources) {
    throw new Error(
      i18n(
        'Too many concurrent jobs: each VM needs at least 512 MiB of guest RAM.',
      ),
    )
  }
  return resources
}

export async function vmDiskSize(
  effects: Parameters<typeof sdk.SubContainer.of>[0],
  capacity: number,
) {
  const result = await sdk.SubContainer.withTemp(
    effects,
    { imageId: 'main' },
    sdk.Mounts.of().mountVolume({
      volumeId: 'scratch',
      subpath: null,
      mountpoint: SCRATCH_DIR,
      readonly: false,
    }),
    'vm-disk-budget',
    (sub) =>
      sub.execFail(['df', '-Pm', SCRATCH_DIR], { user: 'root', timeout: 5000 }),
  )
  const available = Number(
    String(result.stdout).trim().split('\n')[1]?.trim().split(/\s+/)[3],
  )
  const diskGiB = guestDiskGiB(available, capacity)
  if (!diskGiB) {
    throw new Error(
      i18n(
        'Insufficient scratch space: each VM needs at least 8 GiB of disk space within the guest-disk budget.',
      ),
    )
  }
  return diskGiB
}
