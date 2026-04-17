(function () {
  const { computeKeno, parseQueryParams } = window.KenoVerifierCore
  const TWO_POW_32 = 2 ** 32
  const DEFAULT_LANG = 'en'

  const GAME_CONFIG = {
    rtpDisplay: '96.5%',
    houseEdgeDisplay: '3.5%',
    demo: {
      serverSeed: '4d29a1b6e7cf204d29a1b6e7cf204d29a1b6e7cf204d29a1b6e7cf204d29a1b6',
      clientSeed: 'lasbet-keno-player',
      nonce: '18',
      picks: '3,7,12,19,26,31,38',
    },
    translations: {
      en: {
        title: 'Lasbet Provably Fair Keno Verifier',
        heroTitle: 'Lasbet Provably Fair Keno Verifier',
        heroDescription:
          'Enter the server seed, client seed, and nonce to deterministically shuffle 1 to 40 and draw 10 Keno numbers.',
        heroAsideTitle: 'Common Validation Logic',
        heroAsideBody:
          'The verifier computes <code>HMAC_SHA256(serverSeed, clientSeed:nonce:k)</code>, turns it into <code>R[k]</code>, uses that value in Fisher-Yates, and then advances <code>k++</code>.',
        inputTitle: 'Input Parameters',
        serverSeedLabel: 'Server Seed',
        clientSeedLabel: 'Client Seed',
        nonceLabel: 'Nonce',
        picksFieldLabel: 'Player Picks',
        serverSeedPlaceholder: 'Example: b8f4a6c1f9d3e7...',
        clientSeedPlaceholder: 'Example: player-seed-2026',
        picksPlaceholder: 'Example: 3,7,12,19,26',
        verifyButton: 'Verify Result',
        copyButton: 'Copy Verification Steps',
        resultTitle: 'Verification Result',
        formulaLabel: 'Calculation Formula',
        stepsTitle: 'Verification Steps',
        stepsHint: 'Reviewable step by step',
        statusIdle: 'Waiting for input',
        statusWorking: 'Calculating',
        statusSuccess: 'Verification complete',
        statusError: 'Invalid input',
        statusCopied: 'Steps copied',
        statusCopyFailed: 'Copy failed',
        errorServerSeedEmpty: 'Server Seed cannot be empty.',
        errorClientSeedEmpty: 'Client Seed cannot be empty.',
        errorNonceEmpty: 'Nonce cannot be empty.',
        errorNonceInvalid: 'Nonce must be an integer greater than or equal to 0.',
        formulaNote:
          'The verifier uses one fresh HMAC per shuffle step. Each step consumes exactly one random value <code>R[k]</code>, then advances <code>k++</code>.',
        rtpNote:
          'Configured RTP: <strong>{rtp}</strong>. House edge: <strong>{houseEdge}</strong>.',
        drawnNumbersLabel: 'Drawn Numbers',
        drawnNumbersTitle: 'The sorted 10-number draw reconstructed from the shuffle',
        playerPicksLabel: 'Player Picks',
        playerPicksTitle: 'Player picks and matches',
        playerPicksBody: 'Green chips also appear in the draw.',
        playerPicksEmptyTitle: 'No picks entered',
        playerPicksEmptyBody:
          'Enter comma-separated values if you want to verify hit count.',
        initialSteps: [
          'Enter the public <strong>Server Seed</strong>, the active <strong>Client Seed</strong>, and the round <strong>Nonce</strong>.',
          'The page computes <strong>HMAC-SHA256</strong> directly in the browser using the server seed as the key.',
          'Each shuffle step uses one fresh hash and one random value, matching the Fisher-Yates method.',
        ],
        errorSteps: [
          'Enter a valid <strong>Server Seed</strong>, <strong>Client Seed</strong>, and <strong>Nonce</strong> first.',
          '<strong>Nonce</strong> must be an integer greater than or equal to <strong>0</strong>.',
          'Player picks are optional, but when provided they should be numbers from <strong>1</strong> to <strong>40</strong>.',
        ],
        idleMeta: [
          { label: 'HMAC #0', value: '--', code: true },
          { label: 'HMAC #1', value: '--', code: true },
          { label: 'HMAC #2', value: '--', code: true },
        ],
        idleFormulaLines: [
          'numbers = [1..40]',
          'hash_k = HMAC_SHA256(serverSeed, clientSeed:nonce:k)',
          'R[k] = first32(hash_k) / 2^32',
          'j = floor(R[k] * (i + 1))',
          'swap(numbers[i], numbers[j])',
          'k++',
          'display = sort(numbers.slice(0, 10))',
        ],
        stepBuilder: ({ serverSeed, clientSeed, nonce, draw, sortedDraw, picks, hits, swaps }) => {
          const preview = swaps
            .slice(0, 5)
            .map(
              item =>
                `i=${item.i}, hash=<strong>${item.hash.slice(0, 16)}...</strong>, r=<strong>${item.random}</strong>, j=<strong>${item.j}</strong>`,
            )
            .join(' | ')

          return [
            `Use <strong>${serverSeed}</strong> as the HMAC key and the message pattern <strong>${clientSeed}:${nonce}:k</strong>.`,
            'Generate a continuous random sequence <strong>R[0...n]</strong>, where each value comes from <strong>HMAC_SHA256(serverSeed, clientSeed:nonce:k)</strong>.',
            'Start from the ordered list <strong>1..40</strong> and perform Fisher-Yates from index <strong>39</strong> down to <strong>1</strong>.',
            'On each step, compute <strong>j = floor(R[k] * (i + 1))</strong>, swap <strong>numbers[i]</strong> and <strong>numbers[j]</strong>, then advance <strong>k++</strong>.',
            `The first shuffle steps are: ${preview}`,
            `The first 10 numbers after the shuffle are: <strong>${draw.join(', ')}</strong>.`,
            `Sorted display result: <strong>${sortedDraw.join(', ')}</strong>.`,
            `Player picks: <strong>${picks.join(', ') || '-'}</strong>.`,
            `Matched numbers: <strong>${hits.join(', ') || '-'}</strong>.`,
          ]
        },
      },
      es: {
        title: 'Lasbet Provably Fair Keno Verifier',
        heroTitle: 'Lasbet Provably Fair Keno Verifier',
        heroDescription:
          'Ingrese server seed, client seed y nonce para barajar del 1 al 40 de forma determinista y extraer 10 números de Keno.',
        heroAsideTitle: 'Lógica Común de Verificación',
        heroAsideBody:
          'El verificador calcula <code>HMAC_SHA256(serverSeed, clientSeed:nonce:k)</code>, lo convierte en <code>R[k]</code>, usa ese valor en Fisher-Yates y luego avanza <code>k++</code>.',
        inputTitle: 'Parámetros de Entrada',
        serverSeedLabel: 'Server Seed',
        clientSeedLabel: 'Client Seed',
        nonceLabel: 'Nonce',
        picksFieldLabel: 'Números del Jugador',
        serverSeedPlaceholder: 'Ejemplo: b8f4a6c1f9d3e7...',
        clientSeedPlaceholder: 'Ejemplo: player-seed-2026',
        picksPlaceholder: 'Ejemplo: 3,7,12,19,26',
        verifyButton: 'Verificar Resultado',
        copyButton: 'Copiar Pasos de Verificación',
        resultTitle: 'Resultado de Verificación',
        formulaLabel: 'Fórmula de Cálculo',
        stepsTitle: 'Pasos de Verificación',
        stepsHint: 'Revisión paso a paso',
        statusIdle: 'Esperando datos',
        statusWorking: 'Calculando',
        statusSuccess: 'Verificación completa',
        statusError: 'Entrada no válida',
        statusCopied: 'Pasos copiados',
        statusCopyFailed: 'Error al copiar',
        errorServerSeedEmpty: 'Server Seed no puede estar vacío.',
        errorClientSeedEmpty: 'Client Seed no puede estar vacío.',
        errorNonceEmpty: 'Nonce no puede estar vacío.',
        errorNonceInvalid: 'Nonce debe ser un entero mayor o igual a 0.',
        formulaNote:
          'El verificador usa un HMAC nuevo por cada paso del barajado. Cada paso consume exactamente un valor aleatorio <code>R[k]</code> y luego avanza <code>k++</code>.',
        rtpNote:
          'RTP configurado: <strong>{rtp}</strong>. Ventaja de la casa: <strong>{houseEdge}</strong>.',
        drawnNumbersLabel: 'Números Sorteados',
        drawnNumbersTitle: 'Los 10 números ordenados reconstruidos desde el barajado',
        playerPicksLabel: 'Selecciones del Jugador',
        playerPicksTitle: 'Selecciones y aciertos',
        playerPicksBody: 'Las fichas verdes también aparecen en el sorteo.',
        playerPicksEmptyTitle: 'Sin selecciones',
        playerPicksEmptyBody:
          'Ingrese valores separados por comas si desea verificar la cantidad de aciertos.',
        initialSteps: [
          'Ingrese el <strong>Server Seed</strong> público, el <strong>Client Seed</strong> activo y el <strong>Nonce</strong> de la ronda.',
          'La página calcula <strong>HMAC-SHA256</strong> directamente en el navegador usando el server seed como clave.',
          'Cada paso del barajado usa un hash nuevo y un valor aleatorio, igual que el método Fisher-Yates.',
        ],
        errorSteps: [
          'Primero ingrese un <strong>Server Seed</strong>, <strong>Client Seed</strong> y <strong>Nonce</strong> válidos.',
          '<strong>Nonce</strong> debe ser un entero mayor o igual a <strong>0</strong>.',
          'Las selecciones del jugador son opcionales, pero si se ingresan deben ser números entre <strong>1</strong> y <strong>40</strong>.',
        ],
        idleMeta: [
          { label: 'HMAC #0', value: '--', code: true },
          { label: 'HMAC #1', value: '--', code: true },
          { label: 'HMAC #2', value: '--', code: true },
        ],
        idleFormulaLines: [
          'numbers = [1..40]',
          'hash_k = HMAC_SHA256(serverSeed, clientSeed:nonce:k)',
          'R[k] = first32(hash_k) / 2^32',
          'j = floor(R[k] * (i + 1))',
          'swap(numbers[i], numbers[j])',
          'k++',
          'display = sort(numbers.slice(0, 10))',
        ],
        stepBuilder: ({ serverSeed, clientSeed, nonce, draw, sortedDraw, picks, hits, swaps }) => {
          const preview = swaps
            .slice(0, 5)
            .map(
              item =>
                `i=${item.i}, hash=<strong>${item.hash.slice(0, 16)}...</strong>, r=<strong>${item.random}</strong>, j=<strong>${item.j}</strong>`,
            )
            .join(' | ')

          return [
            `Use <strong>${serverSeed}</strong> como clave HMAC y el patrón de mensaje <strong>${clientSeed}:${nonce}:k</strong>.`,
            'Genere una secuencia continua de valores aleatorios <strong>R[0...n]</strong>, donde cada valor sale de <strong>HMAC_SHA256(serverSeed, clientSeed:nonce:k)</strong>.',
            'Comience con la lista ordenada <strong>1..40</strong> y aplique Fisher-Yates desde el índice <strong>39</strong> hasta <strong>1</strong>.',
            'En cada paso, calcule <strong>j = floor(R[k] * (i + 1))</strong>, intercambie <strong>numbers[i]</strong> y <strong>numbers[j]</strong>, y luego avance <strong>k++</strong>.',
            `Los primeros pasos del barajado son: ${preview}`,
            `Los primeros 10 números después del barajado son: <strong>${draw.join(', ')}</strong>.`,
            `Resultado ordenado para mostrar: <strong>${sortedDraw.join(', ')}</strong>.`,
            `Selecciones del jugador: <strong>${picks.join(', ') || '-'}</strong>.`,
            `Números acertados: <strong>${hits.join(', ') || '-'}</strong>.`,
          ]
        },
      },
    },
  }

  let currentLang = DEFAULT_LANG
  let currentResult = null
  let autoVerifyTimer = null

  const elements = {
    form: document.querySelector('#verifierForm'),
    verifyButton: document.querySelector('#verifyButton'),
    serverSeedInput: document.querySelector('#serverSeedInput'),
    clientSeedInput: document.querySelector('#clientSeedInput'),
    nonceInput: document.querySelector('#nonceInput'),
    picksInput: document.querySelector('#picksInput'),
    copyStepsButton: document.querySelector('#copyStepsButton'),
    statusPill: document.querySelector('#statusPill'),
    metaGrid: document.querySelector('#metaGrid'),
    formulaBox: document.querySelector('#formulaBox'),
    visualGrid: document.querySelector('#visualGrid'),
    stepsList: document.querySelector('#stepsList'),
    langToggleButton: document.querySelector('#langToggleButton'),
  }

  function t(key) {
    return GAME_CONFIG.translations[currentLang][key]
  }

  function getRtpNote() {
    return t('rtpNote')
      .replace('{rtp}', GAME_CONFIG.rtpDisplay)
      .replace('{houseEdge}', GAME_CONFIG.houseEdgeDisplay)
  }

  function setStatus(tone = 'idle') {
    const toneKeyMap = {
      idle: 'statusIdle',
      working: 'statusWorking',
      success: 'statusSuccess',
      error: 'statusError',
      copied: 'statusCopied',
      copyFailed: 'statusCopyFailed',
    }

    elements.statusPill.textContent = t(toneKeyMap[tone] || 'statusIdle')
    elements.statusPill.dataset.tone = tone
  }

  function renderSteps(items) {
    elements.stepsList.innerHTML = ''
    items.forEach(item => {
      const li = document.createElement('li')
      li.innerHTML = item
      elements.stepsList.appendChild(li)
    })
  }

  function renderMeta(items) {
    elements.metaGrid.innerHTML = ''
    items.forEach(item => {
      const card = document.createElement('div')
      card.className = 'meta-item'

      const label = document.createElement('span')
      label.className = 'result-label'
      label.textContent = item.label

      const value = document.createElement(item.code ? 'code' : 'span')
      if (!item.code) {
        value.className = 'meta-text'
      }
      value.textContent = item.value

      card.append(label, value)
      elements.metaGrid.appendChild(card)
    })
  }

  function renderFormula(lines) {
    elements.formulaBox.innerHTML = ''

    const label = document.createElement('span')
    label.className = 'formula-label'
    label.textContent = t('formulaLabel')
    elements.formulaBox.appendChild(label)

    lines.forEach(line => {
      const code = document.createElement('code')
      code.textContent = line
      elements.formulaBox.appendChild(code)
    })

    const paragraph = document.createElement('p')
    paragraph.className = 'formula-note'
    paragraph.innerHTML = `${t('formulaNote')} ${getRtpNote()}`
    elements.formulaBox.appendChild(paragraph)
  }

  function renderVisualBlocks(blocks) {
    elements.visualGrid.innerHTML = ''
    blocks.forEach(block => {
      const card = document.createElement('div')
      card.className = 'visual-card'

      const label = document.createElement('span')
      label.className = 'visual-label'
      label.textContent = block.label
      card.appendChild(label)

      if (block.title) {
        const title = document.createElement('strong')
        title.textContent = block.title
        card.appendChild(title)
      }

      if (block.description) {
        const description = document.createElement('p')
        description.innerHTML = block.description
        card.appendChild(description)
      }

      const row = document.createElement('div')
      row.className = 'chip-row'
      block.items.forEach(item => {
        const chip = document.createElement('span')
        chip.className = 'chip'
        if (item.tone) {
          chip.classList.add(item.tone)
        }
        chip.textContent = item.label
        row.appendChild(chip)
      })
      card.appendChild(row)

      elements.visualGrid.appendChild(card)
    })
  }

  function normalizeInput(value) {
    return value.trim()
  }

  function validateCommon(serverSeed, clientSeed, nonce) {
    if (!serverSeed) {
      throw new Error(t('errorServerSeedEmpty'))
    }
    if (!clientSeed) {
      throw new Error(t('errorClientSeedEmpty'))
    }
    if (nonce === '') {
      throw new Error(t('errorNonceEmpty'))
    }
    if (!/^\d+$/.test(nonce)) {
      throw new Error(t('errorNonceInvalid'))
    }
  }

  function buildResult(result) {
    const { hashes, swaps, draw, sortedDraw, picks, hits } = result

    return {
      meta: [
        { label: 'HMAC #0', value: hashes[0] || '--', code: true },
        { label: 'HMAC #1', value: hashes[1] || '--', code: true },
        { label: 'HMAC #2', value: hashes[2] || '--', code: true },
      ],
      formulas: [
        'numbers = [1..40]',
        'hash = HMAC_SHA256(serverSeed, clientSeed:nonce:counter++)',
        `j = floor((first 32 bits / ${TWO_POW_32}) * (i + 1))`,
        'swap(numbers[i], numbers[j])',
        'display = sort(numbers.slice(0, 10))',
      ],
      visuals: [
        {
          label: t('drawnNumbersLabel'),
          title: t('drawnNumbersTitle'),
          items: sortedDraw.map(number => ({
            label: String(number).padStart(2, '0'),
            tone: hits.includes(number) ? 'hit' : '',
          })),
        },
        {
          label: t('playerPicksLabel'),
          title: picks.length ? t('playerPicksTitle') : t('playerPicksEmptyTitle'),
          description: picks.length ? t('playerPicksBody') : t('playerPicksEmptyBody'),
          items: (picks.length ? picks : ['-']).map(item => ({
            label: typeof item === 'number' ? String(item).padStart(2, '0') : item,
            tone: hits.includes(item) ? 'hit' : '',
          })),
        },
      ],
      steps: GAME_CONFIG.translations[currentLang].stepBuilder(result),
      copyLines: [
        `Server Seed: ${result.serverSeed}`,
        `Client Seed: ${result.clientSeed}`,
        `Nonce: ${result.nonce}`,
        `Player Picks: ${picks.join(', ') || '-'}`,
        `Draw: ${sortedDraw.join(', ')}`,
        `Raw Shuffle Result: ${draw.join(', ')}`,
        `Hits: ${hits.join(', ') || '-'}`,
      ],
    }
  }

  function renderIdleState() {
    renderMeta([...GAME_CONFIG.translations[currentLang].idleMeta])
    renderFormula(GAME_CONFIG.translations[currentLang].idleFormulaLines)
    renderVisualBlocks([
      {
        label: t('drawnNumbersLabel'),
        title: t('playerPicksEmptyTitle'),
        description: t('playerPicksEmptyBody'),
        items: [{ label: '01' }, { label: '07' }, { label: '19' }],
      },
    ])
    renderSteps(t('initialSteps'))
  }

  function refreshDynamicContent() {
    if (!currentResult) {
      renderIdleState()
      return
    }

    renderMeta(currentResult.meta)
    renderFormula(currentResult.formulas)
    renderVisualBlocks(currentResult.visuals)
    renderSteps(currentResult.steps)
  }

  function applyStaticTranslations() {
    document.title = t('title')
    document.documentElement.lang = currentLang

    document.querySelectorAll('[data-i18n]').forEach(node => {
      node.textContent = t(node.dataset.i18n)
    })

    document.querySelectorAll('[data-i18n-html]').forEach(node => {
      node.innerHTML = t(node.dataset.i18nHtml)
    })

    document.querySelectorAll('[data-i18n-placeholder]').forEach(node => {
      node.placeholder = t(node.dataset.i18nPlaceholder)
    })

    elements.langToggleButton.textContent = currentLang === 'en' ? 'Español' : 'English'
  }

  function setLanguage(lang) {
    currentLang = lang
    applyStaticTranslations()
    refreshDynamicContent()
    setStatus(currentResult ? 'success' : 'idle')
  }

  async function handleSubmit(event) {
    if (event) {
      event.preventDefault()
    }

    const serverSeed = normalizeInput(elements.serverSeedInput.value)
    const clientSeed = normalizeInput(elements.clientSeedInput.value)
    const nonce = normalizeInput(elements.nonceInput.value)
    const picksRaw = normalizeInput(elements.picksInput.value)

    try {
      validateCommon(serverSeed, clientSeed, nonce)
      setStatus('working')
      elements.copyStepsButton.disabled = true

      const result = await computeKeno({
        serverSeed,
        clientSeed,
        nonce,
        picksRaw,
      })

      currentResult = buildResult(result)
      refreshDynamicContent()
      setStatus('success')
      elements.copyStepsButton.disabled = false
    } catch (error) {
      currentResult = null
      renderIdleState()
      renderSteps(t('errorSteps'))
      setStatus('error')
      elements.copyStepsButton.disabled = true
    }
  }

  function scheduleAutoVerify() {
    clearTimeout(autoVerifyTimer)
    autoVerifyTimer = setTimeout(() => {
      handleSubmit()
    }, 220)
  }

  async function copySteps() {
    const steps = Array.from(elements.stepsList.querySelectorAll('li')).map(
      (item, index) => `${index + 1}. ${item.textContent.trim()}`,
    )

    if (!currentResult || !steps.length) {
      return
    }

    const content = [...currentResult.copyLines, '', ...steps].join('\n')

    try {
      await navigator.clipboard.writeText(content)
      setStatus('copied')
    } catch (error) {
      setStatus('copyFailed')
    }
  }

  function applyInitialValues() {
    const queryState = parseQueryParams(window.location.search)
    const hasQueryOverrides =
      queryState.serverSeed || queryState.clientSeed || queryState.nonce || queryState.picksRaw

    if (hasQueryOverrides) {
      elements.serverSeedInput.value = queryState.serverSeed
      elements.clientSeedInput.value = queryState.clientSeed
      elements.nonceInput.value = queryState.nonce
      elements.picksInput.value = queryState.picksRaw
      return
    }

    elements.serverSeedInput.value = GAME_CONFIG.demo.serverSeed
    elements.clientSeedInput.value = GAME_CONFIG.demo.clientSeed
    elements.nonceInput.value = GAME_CONFIG.demo.nonce
    elements.picksInput.value = GAME_CONFIG.demo.picks
  }

  elements.form.addEventListener('submit', handleSubmit)
  elements.copyStepsButton.addEventListener('click', copySteps)
  elements.langToggleButton.addEventListener('click', () => {
    setLanguage(currentLang === 'en' ? 'es' : 'en')
  })
  ;[
    elements.serverSeedInput,
    elements.clientSeedInput,
    elements.nonceInput,
    elements.picksInput,
  ].forEach(element => {
    element.addEventListener('input', scheduleAutoVerify)
    element.addEventListener('change', scheduleAutoVerify)
  })

  applyStaticTranslations()
  renderIdleState()
  setStatus('idle')
  elements.copyStepsButton.disabled = true
  applyInitialValues()
  handleSubmit()
})()
