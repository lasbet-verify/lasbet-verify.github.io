(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory()
    return
  }

  root.KenoVerifierCore = factory()
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  const TWO_POW_32 = 2 ** 32
  const MAX_BOARD_NUMBER = 40

  function firstDefined(...values) {
    return values.find(value => value != null && value !== '')
  }

  function parsePicks(rawValue) {
    if (!rawValue) return []

    return Array.from(
      new Set(
        String(rawValue)
          .split(',')
          .map(item => Number(item.trim()))
          .filter(item => Number.isInteger(item) && item >= 1 && item <= MAX_BOARD_NUMBER),
      ),
    ).sort((left, right) => left - right)
  }

  function parseQueryParams(search) {
    const params = new URLSearchParams(search || '')

    return {
      clientSeed: firstDefined(params.get('c'), params.get('client_seed'), params.get('clientSeed')) || '',
      serverSeed: firstDefined(params.get('s'), params.get('server_seed'), params.get('serverSeed')) || '',
      nonce: firstDefined(params.get('n'), params.get('nonce')) || '',
      picksRaw:
        firstDefined(params.get('p'), params.get('picks'), params.get('selected_numbers')) || '',
    }
  }

  async function hmacSha256Hex(keyText, message) {
    const keyData = new TextEncoder().encode(String(keyText))
    const cryptoKey = await globalThis.crypto.subtle.importKey(
      'raw',
      keyData,
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign'],
    )

    const signature = await globalThis.crypto.subtle.sign(
      'HMAC',
      cryptoKey,
      new TextEncoder().encode(String(message)),
    )

    return Array.from(new Uint8Array(signature), byte => byte.toString(16).padStart(2, '0')).join('')
  }

  async function computeKeno({ serverSeed, clientSeed, nonce, picksRaw }) {
    const normalizedServerSeed = String(serverSeed)
    const normalizedClientSeed = String(clientSeed)
    const normalizedNonce = String(nonce)
    const numbers = Array.from({ length: MAX_BOARD_NUMBER }, (_, index) => index + 1)
    const hashes = []
    const swaps = []
    let counter = 0

    async function getRandom() {
      const hash = await hmacSha256Hex(
        normalizedServerSeed,
        `${normalizedClientSeed}:${normalizedNonce}:${counter}`,
      )
      const random = parseInt(hash.slice(0, 8), 16) / TWO_POW_32

      hashes.push(hash)
      counter += 1

      return { hash, random }
    }

    for (let i = MAX_BOARD_NUMBER - 1; i > 0; i -= 1) {
      const { hash, random } = await getRandom()
      const j = Math.floor(random * (i + 1))

      ;[numbers[i], numbers[j]] = [numbers[j], numbers[i]]
      swaps.push({
        i,
        j,
        hash,
        random: random.toFixed(12),
      })
    }

    const draw = numbers.slice(0, 10)
    const sortedDraw = [...draw].sort((left, right) => left - right)
    const picks = parsePicks(picksRaw)
    const hits = picks.filter(item => sortedDraw.includes(item))

    return {
      serverSeed: normalizedServerSeed,
      clientSeed: normalizedClientSeed,
      nonce: normalizedNonce,
      hashes,
      swaps,
      draw,
      sortedDraw,
      picks,
      hits,
    }
  }

  return {
    computeKeno,
    parsePicks,
    parseQueryParams,
  }
})
