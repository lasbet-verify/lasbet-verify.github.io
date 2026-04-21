const test = require('node:test')
const assert = require('node:assert/strict')

const {
  extractChoicesFromHistory,
  getCardCount,
  parseQueryParams,
  splitChoiceTokens,
} = require('../lib/hilo-verifier-core.js')

test('parseQueryParams reads product Hilo query params and treats steps as card count', () => {
  assert.deepEqual(
    parseQueryParams('?c=client-seed&s=server-seed&h=server-hash&n=12&i=round-1&steps=4'),
    {
      lang: 'en',
      serverSeed: 'server-seed',
      serverSeedHash: 'server-hash',
      clientSeed: 'client-seed',
      nonceStart: '12',
      roundId: 'round-1',
      historyRaw: '',
      historyChoices: [],
      stepsRaw: '4',
      stepCount: 4,
      cardCount: 4,
      choiceText: '',
    },
  )
})

test('parseQueryParams derives choices from history when product sends history instead of choices', () => {
  const history = encodeURIComponent(
    JSON.stringify([
      { card: '7' },
      { action: 'low', result: 'win' },
      { action: 'high', result: 'win' },
      { action: 'skip' },
    ]),
  )

  assert.deepEqual(
    parseQueryParams(`?c=client-seed&s=server-seed&n=3&steps=2&history=${history}`),
    {
      lang: 'en',
      serverSeed: 'server-seed',
      serverSeedHash: '',
      clientSeed: 'client-seed',
      nonceStart: '3',
      roundId: '',
      historyRaw: '[{"card":"7"},{"action":"low","result":"win"},{"action":"high","result":"win"},{"action":"skip"}]',
      historyChoices: ['low', 'high', 'skip'],
      stepsRaw: '2',
      stepCount: 4,
      cardCount: 4,
      choiceText: 'low, high, skip',
    },
  )
})

test('parseQueryParams extracts actions from compact Hilo history strings used by the game page', () => {
  const history = encodeURIComponent('7♠:start:start:Start Card|Q♠:low:lose:0x|8♠:skip:skip:1.00x')

  assert.deepEqual(
    parseQueryParams(`?c=client-seed&s=server-seed&nonce_start=12&history=${history}`),
    {
      lang: 'en',
      serverSeed: 'server-seed',
      serverSeedHash: '',
      clientSeed: 'client-seed',
      nonceStart: '12',
      roundId: '',
      historyRaw: '7♠:start:start:Start Card|Q♠:low:lose:0x|8♠:skip:skip:1.00x',
      historyChoices: ['low', 'skip'],
      stepsRaw: '',
      stepCount: 3,
      cardCount: 3,
      choiceText: 'low, skip',
    },
  )
})

test('extractChoicesFromHistory tolerates nested history payloads and delimited text', () => {
  assert.deepEqual(
    extractChoicesFromHistory({
      history: [{ choice: 'low' }, { items: [{ action: 'high' }] }, 'skip'],
    }),
    ['low', 'high', 'skip'],
  )

  assert.deepEqual(extractChoicesFromHistory('card:A | low | card:9 | high | skip'), [
    'low',
    'high',
    'skip',
  ])

  assert.deepEqual(
    extractChoicesFromHistory('7♠:start:start:Start Card|Q♠:low:lose:0x|8♠:high:win:1.28x'),
    ['low', 'high'],
  )
})

test('splitChoiceTokens preserves explicit invalid entries for page validation', () => {
  assert.deepEqual(splitChoiceTokens('low, bad, high / skip'), ['low', 'bad', 'high', 'skip'])
})

test('getCardCount always includes the opening card', () => {
  assert.equal(getCardCount(0), 1)
  assert.equal(getCardCount(4), 4)
})
