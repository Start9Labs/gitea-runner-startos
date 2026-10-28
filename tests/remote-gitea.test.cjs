const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const Module = require('node:module')
const { test } = require('node:test')
const ts = require('typescript')
const { StartSdk } = require('@start9labs/start-sdk')

require.extensions['.ts'] = (module, filename) => {
  module._compile(
    ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        target: ts.ScriptTarget.ES2022,
      },
    }).outputText,
    filename,
  )
}

function load(relative, mocks) {
  const filename = path.resolve(__dirname, '..', relative)
  const module = new Module(filename)
  module.filename = filename
  module.paths = Module._nodeModulePaths(path.dirname(filename))
  const originalRequire = module.require.bind(module)
  module.require = (id) => (id in mocks ? mocks[id] : originalRequire(id))
  require.extensions['.ts'](module, filename)
  return module.exports
}

function fixture({
  remoteUrl = '',
  token = '',
  registered = true,
  receipt = '1',
} = {}) {
  const sdk = StartSdk.of()
    .withManifest({ id: 'gitea-runner', volumes: ['main', 'scratch'] })
    .build(true)
  let store = {
    remoteUrl,
    registrationToken: token,
    registrationRevision: 1,
    runnerName: 'startos-runner',
    labels: 'ubuntu-latest:docker://node:22-bookworm',
    capacity: 1,
    emulation: false,
    virtualization: false,
  }
  const identity = registered
    ? { uuid: 'uuid', token: 'persistent-token', name: 'startos-runner' }
    : null
  const read = (value) => ({ read: () => ({ once: async () => value }) })
  const storeJson = {
    read: (map = (s) => s) => ({
      once: async () => map(store),
      const: async () => map(store),
    }),
    merge: async (_, update) => {
      store = { ...store, ...update }
    },
  }
  sdk.SubContainer.withTemp = async () => ({ exitCode: 1 })
  const utils = load('startos/utils.ts', {
    './sdk': { sdk },
    './i18n': { i18n: (s) => s },
    'gitea-startos/startos/utils': { mainHostId: 'gitea', uiPort: 3000 },
  })
  const { configure } = load('startos/actions/configure.ts', {
    '../sdk': { sdk },
    '../i18n': { i18n: (s) => s },
    '../utils': utils,
    '../fileModels/store.json': { storeJson },
    '../fileModels/runnerState': { runnerState: read(identity) },
    '../fileModels/registrationReceipt': { registrationReceipt: read(receipt) },
  })
  const input = {
    gitea: remoteUrl
      ? { selection: 'remote', value: { url: remoteUrl } }
      : { selection: 'local', value: {} },
    runnerName: store.runnerName,
    labels: store.labels,
    capacity: 1,
    emulation: false,
    virtualization: false,
  }
  return {
    sdk,
    utils,
    configure,
    storeJson,
    store: () => store,
    save: async (update) => {
      const spec = await (
        await configure.inputSpec({ effects: {} })
      ).build({ effects: {} })
      return configure.runFn({
        effects: {},
        input: spec.validator.parse({ ...input, ...update }),
      })
    },
  }
}

const remote = (url) => ({ gitea: { selection: 'remote', value: { url } } })
const local = { gitea: { selection: 'local', value: {} } }

test('local defaults and remote prefill preserve registration without exposing tokens', async () => {
  const localFixture = fixture()
  assert.deepEqual(
    (await localFixture.configure.getInputFn({ effects: {} })).gitea,
    local.gitea,
  )
  const f = fixture({ remoteUrl: 'https://git.example.com' })
  const prefill = await f.configure.getInputFn({ effects: {} })
  assert.deepEqual(prefill.gitea, remote('https://git.example.com').gitea)
  assert.equal(prefill.registrationToken, undefined)
  await f.save({ ...remote('https://git.example.com///'), capacity: 2 })
  assert.equal(f.store().remoteUrl, 'https://git.example.com')
  assert.equal(f.store().registrationRevision, 1)
  assert.equal(f.store().registrationToken, '')
})

test('changing instance requires a new token, including pending registrations', async () => {
  for (const options of [
    {},
    { registered: false, token: 'pending', receipt: '0' },
    { remoteUrl: 'https://old.example.com' },
  ]) {
    const f = fixture(options)
    const before = f.store()
    await assert.rejects(
      f.save(remote('https://new.example.com')),
      /Changing the Gitea instance/,
    )
    assert.equal(f.store(), before)
    await f.save({
      ...remote('https://new.example.com/'),
      registrationToken: ' fresh ',
    })
    assert.equal(f.store().remoteUrl, 'https://new.example.com')
    assert.equal(f.store().registrationToken, 'fresh')
    assert.equal(f.store().registrationRevision, 2)
  }
  const f = fixture({ remoteUrl: 'https://old.example.com' })
  await assert.rejects(f.save(local), /Changing the Gitea instance/)
  await f.save({ ...local, registrationToken: 'fresh-local' })
  assert.equal(f.store().remoteUrl, '')
})

test('remote addresses require HTTP(S), reject query/fragment and cannot silently select local', async () => {
  const f = fixture()
  for (const url of [
    '',
    'ftp://git.example.com',
    'https://git.example.com?q=x',
    'https://git.example.com/#fragment',
    'https://bad host',
  ]) {
    await assert.rejects(f.save({ ...remote(url), registrationToken: 'fresh' }))
  }
  await f.save({
    ...remote('http://git.example.com:3000/gitea///'),
    registrationToken: 'fresh',
  })
  assert.equal(f.store().remoteUrl, 'http://git.example.com:3000/gitea')
})

test('remote routing never reads local dependency addresses; local routing retains reactive aliases', async () => {
  const f = fixture()
  f.sdk.host.getBridgeAddress = () => {
    throw new Error('local dependency read')
  }
  f.sdk.host.get = () => {
    throw new Error('local dependency read')
  }
  assert.deepEqual(
    await f.utils.giteaConnection({}, 'https://git.example.com'),
    { url: 'https://git.example.com', localHosts: [] },
  )
  f.sdk.host.getBridgeAddress = (_, options) => {
    assert.equal(options.packageId, 'gitea')
    assert.equal(options.ssl, false)
    return { const: async () => '10.0.3.1:3000' }
  }
  f.sdk.getOsIp = async () => '10.0.3.1'
  f.sdk.host.get = (_, options, map) => ({
    const: async () =>
      map({
        bindings: {
          3000: {
            interfaces: {
              web: {
                addressInfo: {
                  filter: (filter) => {
                    assert.deepEqual(filter, { kind: 'mdns' })
                    return {
                      format: () => [
                        { hostname: 'z.local' },
                        { hostname: 'a.local' },
                        { hostname: 'z.local' },
                      ],
                    }
                  },
                },
              },
            },
          },
        },
      }),
  })
  assert.deepEqual(await f.utils.giteaConnection({}, ''), {
    url: 'http://10.0.3.1:3000',
    localHosts: ['a.local:10.0.3.1', 'z.local:10.0.3.1'],
  })
  f.sdk.host.getBridgeAddress = () => ({ const: async () => null })
  await assert.rejects(
    f.utils.giteaConnection({}, ''),
    /Gitea is not yet reachable/,
  )
})

test('Gitea dependency is enabled only for the local instance', async () => {
  for (const remoteUrl of ['', 'https://git.example.com']) {
    const f = fixture({ remoteUrl })
    let dependency
    f.sdk.Dependency.optional = (id, options) => {
      dependency = { id, ...options }
      return { withInit: () => dependency }
    }
    f.sdk.Dependencies.of = () => ({ addDependency: (d) => d })
    load('startos/dependencies.ts', {
      './sdk': { sdk: f.sdk },
      './i18n': { i18n: (s) => s },
      './fileModels/store.json': { storeJson: f.storeJson },
      './manifest/i18n': { dependencyDescription: {} },
      'gitea-startos/startos/actions/configure': { configure: {} },
    })
    assert.equal(dependency.id, 'gitea')
    assert.equal(await dependency.enabled({ effects: {} }), !remoteUrl)
  }
})
