const test = require('node:test')
const assert = require('node:assert/strict')
const { webcrypto } = require('node:crypto')

globalThis.crypto = webcrypto

const {
  computeDouble,
  mapDoubleResult,
  parseQueryParams,
} = require('../double/verifier-core.js')

test('parseQueryParams reads short-form query params used by product', () => {
  assert.deepEqual(parseQueryParams('?s=server-seed&n=12'), {
    serverSeed: 'server-seed',
    nonce: '12',
  })
})

test('parseQueryParams falls back to descriptive query param names', () => {
  assert.deepEqual(parseQueryParams('?server_seed=server-a&nonce=0'), {
    serverSeed: 'server-a',
    nonce: '0',
  })

  assert.deepEqual(parseQueryParams('?serverSeed=server-b'), {
    serverSeed: 'server-b',
    nonce: '',
  })
})

test('parseQueryParams returns empty fields when URL has no verifier params', () => {
  assert.deepEqual(parseQueryParams(''), {
    serverSeed: '',
    nonce: '',
  })
})

test('mapDoubleResult follows documented probability intervals', () => {
  assert.deepEqual(mapDoubleResult(0), {
    resultKey: 'redLabel',
    intervalText: '0 <= r < 0.475',
  })
  assert.deepEqual(mapDoubleResult(0.474999999), {
    resultKey: 'redLabel',
    intervalText: '0 <= r < 0.475',
  })
  assert.deepEqual(mapDoubleResult(0.475), {
    resultKey: 'blackLabel',
    intervalText: '0.475 <= r < 0.95',
  })
  assert.deepEqual(mapDoubleResult(0.95), {
    resultKey: 'greenLabel',
    intervalText: '0.95 <= r < 1',
  })
})

test('computeDouble reproduces the documented HMAC-SHA256 Double algorithm', async () => {
  const result = await computeDouble({
    serverSeed: 'b8f4a6c1f9d3e7ab91c4275e8f0d1c3bb8f4a6c1f9d3e7ab91c4275e8f0d1c3b',
    nonce: 42,
  })

  assert.equal(
    result.hashedServerSeed,
    '4e9b31ee6d602d431486a75b21b9fd9c6c4c85e92e666bfd20ae5fcd3ef8bbdf',
  )
  assert.equal(
    result.hash,
    '327304b91ba703bbd24bc343f247d5d2dc24c6c4174cce91afc201cbcba53a88',
  )
  assert.equal(result.first13Hex, '327304b91ba70')
  assert.equal(result.x, 887513309887088)
  assert.equal(result.r.toFixed(12), '0.197067542260')
  assert.equal(result.resultKey, 'redLabel')
  assert.equal(result.intervalText, '0 <= r < 0.475')
})
