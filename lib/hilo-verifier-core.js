(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory()
    return
  }

  root.HiloVerifierCore = factory()
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  const MAX_STEP_COUNT = 200
  const HISTORY_KEYS = ['history', 'items', 'trail', 'steps', 'nodes', 'path', 'choices', 'moves', 'records']
  const DIRECT_CHOICE_KEYS = [
    'choice',
    'action',
    'guess',
    'pick',
    'selected',
    'selection',
    'bet',
    'side',
    'move',
    'direction',
    'decision',
    'result',
    'type',
  ]

  function firstDefined(...values) {
    return values.find(value => value != null && value !== '')
  }

  function clampStepCount(rawValue) {
    const value = Number.parseInt(rawValue, 10)

    if (!Number.isFinite(value) || value < 0) return 0
    if (value > MAX_STEP_COUNT) return MAX_STEP_COUNT
    return value
  }

  function normalizeChoice(value) {
    const lower = String(value || '')
      .trim()
      .toLowerCase()

    if (!lower) return ''
    if (
      lower === 'h' ||
      lower === 'high' ||
      lower === 'up' ||
      lower === 'big' ||
      lower === 'alto' ||
      lower === 'alta' ||
      lower === '大' ||
      lower === '高'
    ) {
      return 'high'
    }

    if (
      lower === 'l' ||
      lower === 'low' ||
      lower === 'down' ||
      lower === 'small' ||
      lower === 'bajo' ||
      lower === 'baja' ||
      lower === '小' ||
      lower === '低'
    ) {
      return 'low'
    }

    if (
      lower === 's' ||
      lower === 'skip' ||
      lower === 'pass' ||
      lower === 'saltar' ||
      lower === 'omitir' ||
      lower === 'pasar' ||
      lower === '跳过'
    ) {
      return 'skip'
    }

    return 'invalid'
  }

  function splitChoiceTokens(rawValue) {
    if (!rawValue) return []

    return String(rawValue)
      .split(/[\s,，|/]+/)
      .map(item => item.trim())
      .filter(Boolean)
  }

  function safeJsonParse(rawValue) {
    if (typeof rawValue !== 'string') return null

    const trimmed = rawValue.trim()
    if (!trimmed || (trimmed[0] !== '[' && trimmed[0] !== '{')) return null

    try {
      return JSON.parse(trimmed)
    } catch (error) {
      return null
    }
  }

  function parseSerializedHistoryString(rawValue) {
    if (typeof rawValue !== 'string') return []

    return rawValue
      .split('|')
      .map(segment => segment.trim())
      .filter(Boolean)
      .map(segment => {
        const parts = segment.split(':')
        if (parts.length < 2) return null

        return {
          card: String(parts[0] || '').trim(),
          action: String(parts[1] || '').trim(),
          outcome: String(parts[2] || '').trim(),
          badgeLabel: parts.slice(3).join(':').trim(),
        }
      })
      .filter(Boolean)
  }

  function extractChoicesFromValue(value) {
    if (value == null) return []

    if (typeof value === 'string') {
      const directChoice = normalizeChoice(value)
      if (directChoice && directChoice !== 'invalid') return [directChoice]

      const parsedJson = safeJsonParse(value)
      if (parsedJson != null) return extractChoicesFromValue(parsedJson)

      const serializedHistoryChoices = parseSerializedHistoryString(value)
        .map(item => normalizeChoice(item.action))
        .filter(choice => choice && choice !== 'invalid')
      if (serializedHistoryChoices.length) return serializedHistoryChoices

      return splitChoiceTokens(value)
        .map(normalizeChoice)
        .filter(choice => choice && choice !== 'invalid')
    }

    if (Array.isArray(value)) {
      return value.flatMap(item => extractChoicesFromValue(item))
    }

    if (typeof value === 'object') {
      const directChoices = DIRECT_CHOICE_KEYS.flatMap(key => {
        if (!Object.prototype.hasOwnProperty.call(value, key)) return []

        const choice = normalizeChoice(value[key])
        return choice && choice !== 'invalid' ? [choice] : []
      })

      const nestedChoices = HISTORY_KEYS.flatMap(key => {
        if (!Object.prototype.hasOwnProperty.call(value, key)) return []
        return extractChoicesFromValue(value[key])
      })

      return directChoices.concat(nestedChoices)
    }

    return []
  }

  function extractChoicesFromHistory(rawValue) {
    return extractChoicesFromValue(rawValue)
  }

  function countHistoryItems(value) {
    if (value == null) return 0

    if (typeof value === 'string') {
      const parsedJson = safeJsonParse(value)
      if (parsedJson != null) return countHistoryItems(parsedJson)

      const serializedHistoryItems = parseSerializedHistoryString(value)
      if (serializedHistoryItems.length) return serializedHistoryItems.length

      return 0
    }

    if (Array.isArray(value)) return value.length

    if (typeof value === 'object') {
      for (const key of HISTORY_KEYS) {
        if (!Object.prototype.hasOwnProperty.call(value, key)) continue

        const nestedCount = countHistoryItems(value[key])
        if (nestedCount > 0) return nestedCount
      }
    }

    return 0
  }

  function inferStepCount(rawStepCount, explicitChoiceCount, historyItemCount) {
    return clampStepCount(
      Math.max(
        clampStepCount(rawStepCount),
        explicitChoiceCount > 0 ? explicitChoiceCount + 1 : 0,
        Number(historyItemCount) || 0,
      ),
    )
  }

  function getCardCount(stepCount) {
    return Math.max(clampStepCount(stepCount), 1)
  }

  function parseQueryParams(search) {
    const params = new URLSearchParams(search || '')
    const historyRaw = firstDefined(params.get('history'), params.get('trail')) || ''
    const choiceTextRaw = firstDefined(params.get('choices'), params.get('path')) || ''
    const explicitChoiceCount = splitChoiceTokens(choiceTextRaw).length
    const historyChoices = extractChoicesFromHistory(historyRaw)
    const historyItemCount = countHistoryItems(historyRaw)
    const stepsRaw =
      firstDefined(params.get('steps'), params.get('step_count'), params.get('stepCount')) || ''
    const stepCount = inferStepCount(stepsRaw, explicitChoiceCount, historyItemCount)

    return {
      lang: params.get('lang') === 'es' ? 'es' : 'en',
      serverSeed: firstDefined(params.get('s'), params.get('server_seed'), params.get('serverSeed')) || '',
      serverSeedHash:
        firstDefined(
          params.get('h'),
          params.get('server_seed_hash'),
          params.get('serverSeedHash'),
        ) || '',
      clientSeed: firstDefined(params.get('c'), params.get('client_seed'), params.get('clientSeed')) || '',
      nonceStart:
        firstDefined(
          params.get('n'),
          params.get('nonce'),
          params.get('nonce_start'),
          params.get('nonceStart'),
        ) || '0',
      roundId:
        firstDefined(
          params.get('i'),
          params.get('transaction_id'),
          params.get('round_id'),
          params.get('id'),
        ) || '',
      historyRaw,
      historyChoices,
      stepsRaw,
      stepCount,
      cardCount: getCardCount(stepCount),
      choiceText: choiceTextRaw || historyChoices.join(', '),
    }
  }

  return {
    clampStepCount,
    countHistoryItems,
    extractChoicesFromHistory,
    getCardCount,
    normalizeChoice,
    parseSerializedHistoryString,
    parseQueryParams,
    splitChoiceTokens,
  }
})
