(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory()
    return
  }

  root.WheelVerifierCore = factory()
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  const TWO_POW_52 = 2 ** 52
  const DEFAULT_RESULT_SCALE = 25
  const WHEEL_RESULT_WEIGHTS = [
    {
      colorKey: 'green',
      resultKey: 'greenLabel',
      result: 'Green',
      weight: 10,
      gridCount: 10,
      probabilityText: '40%',
      oddsText: '2.4x',
      rtpText: '96%',
    },
    {
      colorKey: 'yellow',
      resultKey: 'yellowLabel',
      result: 'Yellow',
      weight: 8,
      gridCount: 8,
      probabilityText: '32%',
      oddsText: '3x',
      rtpText: '96%',
    },
    {
      colorKey: 'pink',
      resultKey: 'pinkLabel',
      result: 'Pink',
      weight: 4,
      gridCount: 4,
      probabilityText: '16%',
      oddsText: '6x',
      rtpText: '96%',
    },
    {
      colorKey: 'blue',
      resultKey: 'blueLabel',
      result: 'Blue',
      weight: 2,
      gridCount: 2,
      probabilityText: '8%',
      oddsText: '12x',
      rtpText: '96%',
    },
    {
      colorKey: 'red',
      resultKey: 'redLabel',
      result: 'Red',
      weight: 1,
      gridCount: 1,
      probabilityText: '4%',
      oddsText: '24x',
      rtpText: '96%',
    },
  ]

  function firstDefined(...values) {
    return values.find(value => value != null && value !== '')
  }

  function normalizeWheelColor(value) {
    const normalized = String(value || '').trim().toLowerCase()
    const aliases = {
      green: 'green',
      yellow: 'yellow',
      pink: 'pink',
      multi: 'pink',
      colorful: 'pink',
      colourfull: 'pink',
      colourful: 'pink',
      purple: 'pink',
      blue: 'blue',
      red: 'red',
    }

    return aliases[normalized] || ''
  }

  function parseQueryParams(search) {
    const params = new URLSearchParams(search || '')
    const resultColorRaw = firstDefined(
      params.get('result_color'),
      params.get('resultColor'),
      params.get('winning_option'),
      params.get('winningOption'),
      params.get('result'),
      params.get('color'),
    ) || ''

    return {
      serverSeed: firstDefined(params.get('s'), params.get('server_seed'), params.get('serverSeed')) || '',
      nonce: firstDefined(params.get('n'), params.get('nonce')) || '',
      resultColor: normalizeWheelColor(resultColorRaw),
      resultColorRaw,
      betArea: firstDefined(params.get('bet_area'), params.get('betArea')) || '',
      theoreticalPayoutAmount: firstDefined(
        params.get('theoretical_payout_amount'),
        params.get('theoreticalPayoutAmount'),
      ) || '',
      actualPayoutAmount: firstDefined(
        params.get('actual_payout_amount'),
        params.get('actualPayoutAmount'),
        params.get('payout_amount'),
        params.get('payoutAmount'),
      ) || '',
      maxPayoutCapAmount: firstDefined(
        params.get('max_payout_cap_amount'),
        params.get('maxPayoutCapAmount'),
      ) || '',
      maxPayoutHitReason: firstDefined(
        params.get('max_payout_hit_reason'),
        params.get('maxPayoutHitReason'),
      ) || '',
    }
  }

  function buildIntervalText(startWeight, endWeight, resultScale) {
    const start = startWeight / resultScale
    const end = endWeight / resultScale
    const startText = start === 0 ? '0' : start.toFixed(2)
    const endText = end === 1 ? '1' : end.toFixed(2)
    return `${startText} <= r < ${endText}`
  }

  function mapWheelResult(r, {
    resultScale = DEFAULT_RESULT_SCALE,
    weights = WHEEL_RESULT_WEIGHTS,
  } = {}) {
    const normalizedScale = Number(resultScale)
    const scale = Number.isFinite(normalizedScale) && normalizedScale > 0
      ? Math.floor(normalizedScale)
      : DEFAULT_RESULT_SCALE
    const bucket = Math.min(scale - 1, Math.max(0, Math.floor(Number(r) * scale)))

    let startWeight = 0
    for (const weightConfig of weights) {
      const endWeight = startWeight + weightConfig.weight
      if (bucket < endWeight) {
        return {
          ...weightConfig,
          bucket,
          resultScale: scale,
          intervalText: buildIntervalText(startWeight, endWeight, scale),
        }
      }
      startWeight = endWeight
    }

    const fallback = weights[weights.length - 1]
    return {
      ...fallback,
      bucket,
      resultScale: scale,
      intervalText: buildIntervalText(scale - fallback.weight, scale, scale),
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

  async function computeWheel({ serverSeed, nonce }) {
    const normalizedServerSeed = String(serverSeed)
    const inputString = String(nonce)
    const hashedServerSeed = await sha256Hex(normalizedServerSeed)
    const hash = await hmacSha256Hex(normalizedServerSeed, inputString)
    const first13Hex = hash.slice(0, 13)
    const x = parseInt(first13Hex, 16)
    const r = x / TWO_POW_52
    const mapped = mapWheelResult(r)

    return {
      serverSeed: normalizedServerSeed,
      nonce: inputString,
      hashedServerSeed,
      inputString,
      hash,
      first13Hex,
      x,
      r,
      bucket: mapped.bucket,
      resultScale: mapped.resultScale,
      weight: mapped.weight,
      colorKey: mapped.colorKey,
      resultKey: mapped.resultKey,
      result: mapped.result,
      gridCount: mapped.gridCount,
      probabilityText: mapped.probabilityText,
      oddsText: mapped.oddsText,
      rtpText: mapped.rtpText,
      intervalText: mapped.intervalText,
    }
  }

  return {
    DEFAULT_RESULT_SCALE,
    WHEEL_RESULT_WEIGHTS,
    computeWheel,
    hmacSha256Hex,
    mapWheelResult,
    normalizeWheelColor,
    parseQueryParams,
    sha256Hex,
  }
})
