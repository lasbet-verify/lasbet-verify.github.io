(function () {
  const TWO_POW_52 = Math.pow(2, 52)
  const HOUSE_EDGE = 0.01

  function parseQueryParams(search) {
    return String(search || window.location.search || '')
      .replace(/^\?/, '')
      .split('&')
      .filter(Boolean)
      .reduce(function (result, pair) {
        const parts = pair.split('=')
        const key = decodeURIComponent(parts[0] || '')
        const value = decodeURIComponent((parts.slice(1).join('=') || '').replace(/\+/g, ' '))
        if (key) result[key] = value
        return result
      }, {})
  }

  function sha256Hex(value) {
    return CryptoJS.SHA256(CryptoJS.enc.Utf8.parse(String(value || ''))).toString()
  }

  function formatInteger(value) {
    const normalized = Number(value)
    if (!Number.isFinite(normalized)) return '--'
    return normalized.toLocaleString('en-US')
  }

  function formatMultiplier(value, digits) {
    const normalized = Number(value)
    if (!Number.isFinite(normalized)) return '--'
    return normalized.toFixed(digits == null ? 2 : digits) + 'x'
  }

  function computeCrash(serverSeed, roundId) {
    const normalizedServerSeed = String(serverSeed || '')
    const normalizedRoundId = String(roundId || '')
    const inputString = normalizedServerSeed + ':' + normalizedRoundId
    const serverSeedHash = sha256Hex(normalizedServerSeed)
    const roundHash = sha256Hex(inputString)
    const first52BitsHex = roundHash.slice(0, 13)
    const first52BitsInt = parseInt(first52BitsHex || '0', 16)
    const ratio = first52BitsInt / TWO_POW_52
    const safeRatio = Math.min(0.999999999999, Math.max(0, ratio))
    const rawMultiplier = safeRatio < HOUSE_EDGE ? 1 : (1 - HOUSE_EDGE) / (1 - safeRatio)
    const finalMultiplier =
      safeRatio < HOUSE_EDGE ? 1 : Math.max(1, Math.floor(rawMultiplier * 100) / 100)

    return {
      serverSeed: normalizedServerSeed,
      roundId: normalizedRoundId,
      inputString,
      serverSeedHash,
      roundHash,
      first52BitsHex,
      first52BitsInt,
      first52BitsFormatted: formatInteger(first52BitsInt),
      ratio,
      ratioDisplay: ratio.toFixed(12),
      rawMultiplier,
      rawMultiplierDisplay: formatMultiplier(rawMultiplier, 12),
      finalMultiplier,
      finalMultiplierDisplay: formatMultiplier(finalMultiplier, 2),
    }
  }

  window.CrashVerifierCore = {
    HOUSE_EDGE,
    TWO_POW_52,
    computeCrash,
    formatInteger,
    formatMultiplier,
    parseQueryParams,
    sha256Hex,
  }
})()
