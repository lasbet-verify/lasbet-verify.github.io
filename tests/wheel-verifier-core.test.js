const test = require('node:test')
const assert = require('node:assert/strict')
const { webcrypto } = require('node:crypto')

globalThis.crypto = webcrypto

const {
  computeDouble,
  parseQueryParams: parseDoubleQueryParams,
} = require('../double/verifier-core.js')
const {
  computeWheel,
  mapWheelResult,
  normalizeWheelColor,
  parseQueryParams,
} = require('../wheel/verifier-core.js')

test('parseQueryParams reads the same product params as the Double verifier', () => {
  assert.deepEqual(
    {
      serverSeed: parseQueryParams('?s=server-seed&n=12').serverSeed,
      nonce: parseQueryParams('?s=server-seed&n=12').nonce,
    },
    parseDoubleQueryParams('?s=server-seed&n=12'),
  )
  assert.equal(parseQueryParams('?server_seed=server-a&nonce=0').serverSeed, 'server-a')
  assert.equal(parseQueryParams('?server_seed=server-a&nonce=0').nonce, '0')
  assert.equal(parseQueryParams('?serverSeed=server-b').serverSeed, 'server-b')
  assert.equal(parseQueryParams('?serverSeed=server-b').nonce, '')
  assert.equal(parseQueryParams('').serverSeed, '')
  assert.equal(parseQueryParams('').nonce, '')
})

test('parseQueryParams accepts optional Wheel verification fields from the service contract', () => {
  assert.deepEqual(
    parseQueryParams('?s=server-seed&n=12&result_color=MULTI&bet_area=GREEN&theoretical_payout_amount=240&actual_payout_amount=200&max_payout_cap_amount=40&max_payout_hit_reason=cap_hit'),
    {
      serverSeed: 'server-seed',
      nonce: '12',
      resultColor: 'pink',
      resultColorRaw: 'MULTI',
      betArea: 'GREEN',
      theoreticalPayoutAmount: '240',
      actualPayoutAmount: '200',
      maxPayoutCapAmount: '40',
      maxPayoutHitReason: 'cap_hit',
    },
  )
  assert.equal(normalizeWheelColor('PINK'), 'pink')
  assert.equal(normalizeWheelColor('COLORFUL'), 'pink')
  assert.equal(normalizeWheelColor('unknown'), '')
})

test('mapWheelResult follows the configured Wheel probability table', () => {
  assert.deepEqual(mapWheelResult(0), {
    colorKey: 'green',
    resultKey: 'greenLabel',
    result: 'Green',
    weight: 10,
    gridCount: 10,
    probabilityText: '40%',
    oddsText: '2.4x',
    rtpText: '96%',
    bucket: 0,
    resultScale: 25,
    intervalText: '0 <= r < 0.40',
  })
  assert.deepEqual(mapWheelResult(0.399999999), {
    colorKey: 'green',
    resultKey: 'greenLabel',
    result: 'Green',
    weight: 10,
    gridCount: 10,
    probabilityText: '40%',
    oddsText: '2.4x',
    rtpText: '96%',
    bucket: 9,
    resultScale: 25,
    intervalText: '0 <= r < 0.40',
  })
  assert.deepEqual(mapWheelResult(0.4), {
    colorKey: 'yellow',
    resultKey: 'yellowLabel',
    result: 'Yellow',
    weight: 8,
    gridCount: 8,
    probabilityText: '32%',
    oddsText: '3x',
    rtpText: '96%',
    bucket: 10,
    resultScale: 25,
    intervalText: '0.40 <= r < 0.72',
  })
  assert.deepEqual(mapWheelResult(0.72), {
    colorKey: 'pink',
    resultKey: 'pinkLabel',
    result: 'Pink',
    weight: 4,
    gridCount: 4,
    probabilityText: '16%',
    oddsText: '6x',
    rtpText: '96%',
    bucket: 18,
    resultScale: 25,
    intervalText: '0.72 <= r < 0.88',
  })
  assert.deepEqual(mapWheelResult(0.88), {
    colorKey: 'blue',
    resultKey: 'blueLabel',
    result: 'Blue',
    weight: 2,
    gridCount: 2,
    probabilityText: '8%',
    oddsText: '12x',
    rtpText: '96%',
    bucket: 22,
    resultScale: 25,
    intervalText: '0.88 <= r < 0.96',
  })
  assert.deepEqual(mapWheelResult(0.96), {
    colorKey: 'red',
    resultKey: 'redLabel',
    result: 'Red',
    weight: 1,
    gridCount: 1,
    probabilityText: '4%',
    oddsText: '24x',
    rtpText: '96%',
    bucket: 24,
    resultScale: 25,
    intervalText: '0.96 <= r < 1',
  })
})

test('computeWheel reuses the Double random-number algorithm and applies Wheel color mapping', async () => {
  const params = {
    serverSeed: 'b8f4a6c1f9d3e7ab91c4275e8f0d1c3bb8f4a6c1f9d3e7ab91c4275e8f0d1c3b',
    nonce: 42,
  }
  const wheelResult = await computeWheel(params)
  const doubleResult = await computeDouble(params)

  assert.equal(wheelResult.hashedServerSeed, doubleResult.hashedServerSeed)
  assert.equal(wheelResult.inputString, doubleResult.inputString)
  assert.equal(wheelResult.hash, doubleResult.hash)
  assert.equal(wheelResult.first13Hex, doubleResult.first13Hex)
  assert.equal(wheelResult.x, doubleResult.x)
  assert.equal(wheelResult.r, doubleResult.r)
  assert.equal(wheelResult.colorKey, 'green')
  assert.equal(wheelResult.intervalText, '0 <= r < 0.40')
  assert.equal(wheelResult.bucket, 4)
  assert.equal(wheelResult.resultScale, 25)
  assert.equal(wheelResult.weight, 10)
  assert.equal(wheelResult.gridCount, 10)
  assert.equal(wheelResult.probabilityText, '40%')
  assert.equal(wheelResult.oddsText, '2.4x')
  assert.equal(wheelResult.rtpText, '96%')
})
