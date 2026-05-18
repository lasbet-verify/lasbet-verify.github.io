(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory()
    return
  }

  root.DoubleVerifierCore = factory()
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  const TWO_POW_52 = 2 ** 52

  function firstDefined(...values) {
    return values.find(value => value != null && value !== '')
  }

  function parseQueryParams(search) {
    const params = new URLSearchParams(search || '')

    return {
      serverSeed: firstDefined(params.get('s'), params.get('server_seed'), params.get('serverSeed')) || '',
      nonce: firstDefined(params.get('n'), params.get('nonce')) || '',
    }
  }

  function mapDoubleResult(r) {
    if (r < 0.475) {
      return {
        resultKey: 'redLabel',
        intervalText: '0 <= r < 0.475',
      }
    }

    if (r < 0.95) {
      return {
        resultKey: 'blackLabel',
        intervalText: '0.475 <= r < 0.95',
      }
    }

    return {
      resultKey: 'greenLabel',
      intervalText: '0.95 <= r < 1',
    }
  }

  async function sha256Hex(input) {
    const digest = await globalThis.crypto.subtle.digest(
      'SHA-256',
      new TextEncoder().encode(String(input)),
    )

    return Array.from(new Uint8Array(digest), byte => byte.toString(16).padStart(2, '0')).join('')
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

  async function computeDouble({ serverSeed, nonce }) {
    const normalizedServerSeed = String(serverSeed)
    const inputString = String(nonce)
    const hashedServerSeed = await sha256Hex(normalizedServerSeed)
    const hash = await hmacSha256Hex(normalizedServerSeed, inputString)
    const first13Hex = hash.slice(0, 13)
    const x = parseInt(first13Hex, 16)
    const r = x / TWO_POW_52
    const mapped = mapDoubleResult(r)

    return {
      serverSeed: normalizedServerSeed,
      nonce: inputString,
      hashedServerSeed,
      inputString,
      hash,
      first13Hex,
      x,
      r,
      resultKey: mapped.resultKey,
      intervalText: mapped.intervalText,
    }
  }

  return {
    computeDouble,
    hmacSha256Hex,
    mapDoubleResult,
    parseQueryParams,
    sha256Hex,
  }
})
