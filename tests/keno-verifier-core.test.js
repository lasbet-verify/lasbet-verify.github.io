const test = require('node:test')
const assert = require('node:assert/strict')

const {
  computeKeno,
  parsePicks,
  parseQueryParams,
} = require('../lib/keno-verifier-core.js')

test('parseQueryParams reads short-form query params used by product', () => {
  assert.deepEqual(parseQueryParams('?c=client-seed&s=server-seed&n=12&p=3,7,12'), {
    clientSeed: 'client-seed',
    serverSeed: 'server-seed',
    nonce: '12',
    picksRaw: '3,7,12',
  })
})

test('parseQueryParams falls back to descriptive query param names', () => {
  assert.deepEqual(
    parseQueryParams('?client_seed=client-a&server_seed=server-b&nonce=0&selected_numbers=40,5,7'),
    {
      clientSeed: 'client-a',
      serverSeed: 'server-b',
      nonce: '0',
      picksRaw: '40,5,7',
    },
  )
})

test('parsePicks normalizes, deduplicates, filters, and sorts player picks', () => {
  assert.deepEqual(parsePicks('40, 5, 5, bad, 7, 0, 41, 3'), [3, 5, 7, 40])
})

test('computeKeno reproduces the expected draw for the shipped demo seeds', async () => {
  const result = await computeKeno({
    serverSeed: '4d29a1b6e7cf204d29a1b6e7cf204d29a1b6e7cf204d29a1b6e7cf204d29a1b6',
    clientSeed: 'lasbet-keno-player',
    nonce: '18',
    picksRaw: '3,7,12,19,26,31,38',
  })

  assert.deepEqual(result.draw, [19, 17, 30, 31, 13, 2, 9, 18, 7, 12])
  assert.deepEqual(result.sortedDraw, [2, 7, 9, 12, 13, 17, 18, 19, 30, 31])
  assert.deepEqual(result.hits, [7, 12, 19, 31])
  assert.equal(result.hashes.length, 39)
  assert.equal(result.swaps.length, 39)
})
