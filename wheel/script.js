const GAME_CONFIG = {
  translations: {
    en: {
      title: "Lasbet Provably Fair Wheel Verifier",
      heroTitle: "Lasbet Provably Fair Wheel Verifier",
      heroDescription:
        "Enter <code>server_seed</code> and <code>nonce</code> to reproduce the shared Wheel round result and verify the final <code>GREEN / YELLOW / PINK / BLUE / RED</code> outcome.",
      heroAsideTitle: "Wheel Mapping",
      heroAsideBody:
        "The verifier computes <code>HMAC_SHA256(server_seed, String(nonce))</code>, converts the first 13 hex characters to <code>r</code>, derives <code>bucket = floor(r * 25)</code>, and maps the bucket by configured weights: Green 10, Yellow 8, Pink 4, Blue 2, Red 1. Because this is a multiplayer room, <strong>no client_seed is required</strong> and all players share the same outcome.",
      inputTitle: "Input Parameters",
      serverSeedLabel: "Server Seed",
      nonceLabel: "Nonce",
      serverSeedPlaceholder: "Example: b8f4a6c1f9d3e7...",
      copyButton: "Copy Verification Steps",
      resultTitle: "Verification Result",
      stepsTitle: "Verification Steps",
      stepsHint: "Every calculation is listed",
      statusIdle: "Waiting for input",
      statusWorking: "Calculating",
      statusSuccess: "Verification complete",
      statusError: "Invalid input",
      statusCopied: "Steps copied",
      statusCopyFailed: "Copy failed",
      errorServerSeedEmpty: "Server Seed cannot be empty.",
      errorNonceEmpty: "Nonce cannot be empty.",
      errorNonceInvalid: "Nonce must be an integer greater than or equal to 0.",
      formulaLabel: "Calculation Formula",
      formulaNote:
        "This page follows the configured Wheel fairness flow: commitment hash, HMAC round hash, 52-bit random value, and the 25-slot probability table with 96% RTP.",
      commitmentLabel: "Hashed Server Seed",
      roundHashLabel: "HMAC-SHA256",
      first52Label: "First 13 Hex / 52 Bits",
      randomValueLabel: "Random Value r",
      bucketLabel: "Bucket",
      resultScaleLabel: "Result Scale",
      outcomeLabel: "Round Result",
      intervalLabel: "Probability Interval",
      gridCountLabel: "Grid Count",
      probabilityLabel: "Probability",
      oddsLabel: "Odds",
      rtpLabel: "RTP",
      serverResultLabel: "Server Result",
      betAreaLabel: "Bet Area",
      resultCompareLabel: "Result Match",
      theoreticalPayoutLabel: "Theoretical Payout",
      actualPayoutLabel: "Actual Payout",
      maxPayoutCapLabel: "Max Payout Cap",
      maxPayoutReasonLabel: "Max Payout Reason",
      notProvided: "--",
      resultMatched: "Matched",
      resultMismatched: "Mismatched",
      resultCompareNotProvided: "No server result was supplied in the verifier URL.",
      payoutCompareNotProvided: "Payout/cap fields were not supplied in the verifier URL.",
      redLabel: "RED",
      blueLabel: "BLUE",
      greenLabel: "GREEN",
      yellowLabel: "YELLOW",
      pinkLabel: "PINK",
      initialSteps: [
        "Load settled Wheel play record.",
        "Load settled Wheel round fair seed fact.",
        "Recompute <strong>HMAC-SHA256(server_seed, String(nonce))</strong>; use first 13 hex chars divided by <strong>2^52</strong>; map bucket to GREEN / YELLOW / PINK / BLUE / RED by configured weights.",
        "Compare theoretical payout, actual payout, and Max Payout cap fields when those fields are supplied.",
      ],
      errorSteps: [
        "Enter a valid <strong>server_seed</strong> and <strong>nonce</strong> first.",
        "<strong>Nonce</strong> must be an integer greater than or equal to <strong>0</strong>.",
        "The same <strong>server_seed</strong> and <strong>nonce</strong> must always produce the same Wheel result.",
      ],
      resultBuilder: ({
        hashedServerSeed,
        hash,
        first13Hex,
        x,
        r,
        bucket,
        resultScale,
        result,
        intervalText,
        inputString,
        gridCount,
        probabilityText,
        oddsText,
        rtpText,
        resultCompareText,
        payoutCompareText,
      }) => [
        "Step 1: Loaded the settled Wheel play record.",
        `Step 2: Loaded the settled Wheel round fair seed fact: <strong>SHA-256(server_seed)</strong> is <strong>${hashedServerSeed}</strong>, and <strong>nonce</strong> is <strong>${inputString}</strong>.`,
        `Step 3: Recomputed <strong>HMAC-SHA256(server_seed, String(nonce))</strong>: <strong>${hash}</strong>. First 13 hex chars <strong>${first13Hex}</strong> produce <strong>x = ${x}</strong>, <strong>r = ${r.toFixed(12)}</strong>, and <strong>bucket = floor(r * ${resultScale}) = ${bucket}</strong>. The configured GREEN/YELLOW/PINK/BLUE/RED weights map <strong>${intervalText}</strong> to <strong>${result}</strong>, with <strong>${gridCount}</strong> slots, <strong>${probabilityText}</strong> probability, <strong>${oddsText}</strong> odds, and <strong>${rtpText}</strong> RTP.`,
        `Step 4: ${resultCompareText} ${payoutCompareText}`,
      ],
    },
    es: {
      title: "Lasbet Provably Fair Wheel Verifier",
      heroTitle: "Lasbet Provably Fair Wheel Verifier",
      heroDescription:
        "Ingrese <code>server_seed</code> y <code>nonce</code> para reproducir el resultado compartido de una ronda Wheel y verificar el desenlace final <code>GREEN / YELLOW / PINK / BLUE / RED</code>.",
      heroAsideTitle: "Mapeo de Wheel",
      heroAsideBody:
        "El verificador calcula <code>HMAC_SHA256(server_seed, String(nonce))</code>, convierte los primeros 13 caracteres hexadecimales en <code>r</code>, deriva <code>bucket = floor(r * 25)</code> y mapea el bucket con los pesos configurados: Green 10, Yellow 8, Pink 4, Blue 2, Red 1. Como es una sala multijugador, <strong>no se requiere client_seed</strong> y todos los jugadores comparten el mismo resultado.",
      inputTitle: "Parámetros de Entrada",
      serverSeedLabel: "Server Seed",
      nonceLabel: "Nonce",
      serverSeedPlaceholder: "Ejemplo: b8f4a6c1f9d3e7...",
      copyButton: "Copiar Pasos de Verificación",
      resultTitle: "Resultado de Verificación",
      stepsTitle: "Pasos de Verificación",
      stepsHint: "Se muestra cada cálculo",
      statusIdle: "Esperando datos",
      statusWorking: "Calculando",
      statusSuccess: "Verificación completa",
      statusError: "Entrada no válida",
      statusCopied: "Pasos copiados",
      statusCopyFailed: "Error al copiar",
      errorServerSeedEmpty: "Server Seed no puede estar vacío.",
      errorNonceEmpty: "Nonce no puede estar vacío.",
      errorNonceInvalid: "Nonce debe ser un entero mayor o igual a 0.",
      formulaLabel: "Fórmula de Cálculo",
      formulaNote:
        "Esta página sigue el flujo configurado de justicia para Wheel: hash de compromiso, hash HMAC de la ronda, valor aleatorio de 52 bits y la tabla de probabilidad de 25 casillas con RTP de 96%.",
      commitmentLabel: "Hashed Server Seed",
      roundHashLabel: "HMAC-SHA256",
      first52Label: "Primeros 13 Hex / 52 Bits",
      randomValueLabel: "Valor Aleatorio r",
      bucketLabel: "Bucket",
      resultScaleLabel: "Escala de Resultado",
      outcomeLabel: "Resultado de la Ronda",
      intervalLabel: "Intervalo de Probabilidad",
      gridCountLabel: "Casillas",
      probabilityLabel: "Probabilidad",
      oddsLabel: "Cuota",
      rtpLabel: "RTP",
      serverResultLabel: "Resultado del Servidor",
      betAreaLabel: "Área de Apuesta",
      resultCompareLabel: "Coincidencia de Resultado",
      theoreticalPayoutLabel: "Pago Teórico",
      actualPayoutLabel: "Pago Real",
      maxPayoutCapLabel: "Límite Max Payout",
      maxPayoutReasonLabel: "Motivo del Límite",
      notProvided: "--",
      resultMatched: "Coincide",
      resultMismatched: "No coincide",
      resultCompareNotProvided: "No se recibió resultado del servidor en la URL de verificación.",
      payoutCompareNotProvided: "No se recibieron campos de pago/límite en la URL de verificación.",
      redLabel: "RED",
      blueLabel: "BLUE",
      greenLabel: "GREEN",
      yellowLabel: "YELLOW",
      pinkLabel: "PINK",
      initialSteps: [
        "Cargue el registro Wheel liquidado.",
        "Cargue el fair seed fact de la ronda Wheel liquidada.",
        "Recalcule <strong>HMAC-SHA256(server_seed, String(nonce))</strong>; use los primeros 13 caracteres hexadecimales divididos por <strong>2^52</strong>; mapee el bucket a GREEN / YELLOW / PINK / BLUE / RED por pesos configurados.",
        "Compare el pago teórico, el pago real y los campos de límite Max Payout cuando estén disponibles.",
      ],
      errorSteps: [
        "Primero ingrese un <strong>server_seed</strong> y <strong>nonce</strong> válidos.",
        "<strong>Nonce</strong> debe ser un entero mayor o igual a <strong>0</strong>.",
        "El mismo <strong>server_seed</strong> y <strong>nonce</strong> siempre deben producir el mismo resultado de Wheel.",
      ],
      resultBuilder: ({
        hashedServerSeed,
        hash,
        first13Hex,
        x,
        r,
        bucket,
        resultScale,
        result,
        intervalText,
        inputString,
        gridCount,
        probabilityText,
        oddsText,
        rtpText,
        resultCompareText,
        payoutCompareText,
      }) => [
        "Paso 1: Se cargó el registro Wheel liquidado.",
        `Paso 2: Se cargó el fair seed fact de la ronda Wheel liquidada: <strong>SHA-256(server_seed)</strong> es <strong>${hashedServerSeed}</strong>, y <strong>nonce</strong> es <strong>${inputString}</strong>.`,
        `Paso 3: Se recalculó <strong>HMAC-SHA256(server_seed, String(nonce))</strong>: <strong>${hash}</strong>. Los primeros 13 caracteres <strong>${first13Hex}</strong> producen <strong>x = ${x}</strong>, <strong>r = ${r.toFixed(12)}</strong> y <strong>bucket = floor(r * ${resultScale}) = ${bucket}</strong>. Los pesos configurados GREEN/YELLOW/PINK/BLUE/RED mapean <strong>${intervalText}</strong> a <strong>${result}</strong>, con <strong>${gridCount}</strong> casillas, probabilidad <strong>${probabilityText}</strong>, cuota <strong>${oddsText}</strong> y RTP <strong>${rtpText}</strong>.`,
        `Paso 4: ${resultCompareText} ${payoutCompareText}`,
      ],
    },
  },
};

const DEFAULT_LANG = "en";
let currentLang = DEFAULT_LANG;
let currentResult = null;
let currentVerifyContext = {};
let autoVerifyTimer = null;

const elements = {
  form: document.querySelector("#verifierForm"),
  serverSeedInput: document.querySelector("#serverSeedInput"),
  nonceInput: document.querySelector("#nonceInput"),
  copyStepsButton: document.querySelector("#copyStepsButton"),
  statusPill: document.querySelector("#statusPill"),
  visualGrid: document.querySelector("#visualGrid"),
  metaGrid: document.querySelector("#metaGrid"),
  formulaBox: document.querySelector("#formulaBox"),
  stepsList: document.querySelector("#stepsList"),
  langToggleButton: document.querySelector("#langToggleButton"),
};

function t(key) {
  return GAME_CONFIG.translations[currentLang][key];
}

function setStatus(tone = "idle") {
  const toneKeyMap = {
    idle: "statusIdle",
    working: "statusWorking",
    success: "statusSuccess",
    error: "statusError",
    copied: "statusCopied",
    copyFailed: "statusCopyFailed",
  };
  elements.statusPill.textContent = t(toneKeyMap[tone] || "statusIdle");
  elements.statusPill.dataset.tone = tone;
}

function renderSteps(items) {
  elements.stepsList.innerHTML = "";
  items.forEach((item) => {
    const li = document.createElement("li");
    li.innerHTML = item;
    elements.stepsList.appendChild(li);
  });
}

function renderMeta(items) {
  elements.metaGrid.innerHTML = "";
  items.forEach((item) => {
    const card = document.createElement("div");
    card.className = "meta-item";
    const label = document.createElement("span");
    label.className = "result-label";
    label.textContent = item.label;
    const value = document.createElement(item.code ? "code" : "span");
    if (!item.code) {
      value.className = "meta-text";
    }
    value.textContent = item.value;
    card.append(label, value);
    elements.metaGrid.appendChild(card);
  });
}

function renderFormula(lines) {
  elements.formulaBox.innerHTML = "";
  const label = document.createElement("span");
  label.className = "formula-label";
  label.textContent = t("formulaLabel");
  elements.formulaBox.appendChild(label);
  lines.forEach((line) => {
    const code = document.createElement("code");
    code.textContent = line;
    elements.formulaBox.appendChild(code);
  });
  const paragraph = document.createElement("p");
  paragraph.className = "formula-note";
  paragraph.innerHTML = t("formulaNote");
  elements.formulaBox.appendChild(paragraph);
}

function renderVisuals(blocks) {
  elements.visualGrid.innerHTML = "";
  blocks.forEach((block) => {
    const card = document.createElement("div");
    card.className = "visual-card";
    const label = document.createElement("span");
    label.className = "visual-label";
    label.textContent = block.label;
    card.appendChild(label);
    const title = document.createElement("strong");
    title.textContent = block.title;
    card.appendChild(title);
    if (block.description) {
      const description = document.createElement("p");
      description.innerHTML = block.description;
      card.appendChild(description);
    }
    const row = document.createElement("div");
    row.className = "chip-row";
    block.items.forEach((item) => {
      const chip = document.createElement("span");
      chip.className = "chip";
      if (item.tone) {
        chip.classList.add(...item.tone.split(" "));
      }
      chip.textContent = item.label;
      row.appendChild(chip);
    });
    card.appendChild(row);
    elements.visualGrid.appendChild(card);
  });
}

function parseNonce(value) {
  const trimmed = value.trim();
  if (!trimmed) {
    throw new Error(t("errorNonceEmpty"));
  }
  if (!/^\d+$/.test(trimmed)) {
    throw new Error(t("errorNonceInvalid"));
  }
  return trimmed;
}

function optionalText(value) {
  return value != null && value !== "" ? String(value) : t("notProvided");
}

function getColorDisplay(colorKey, fallback = "") {
  const labelKey = colorKey ? `${colorKey}Label` : "";
  return labelKey && t(labelKey) ? t(labelKey) : optionalText(fallback);
}

function getResultCompareText(result, verifyContext) {
  if (!verifyContext.resultColor) {
    return t("resultCompareNotProvided");
  }

  const serverResult = getColorDisplay(verifyContext.resultColor, verifyContext.resultColorRaw);
  const compareStatus = verifyContext.resultColor === result.colorKey
    ? t("resultMatched")
    : t("resultMismatched");

  if (currentLang === "es") {
    return `Resultado del servidor <strong>${serverResult}</strong>; resultado recalculado <strong>${result.result}</strong>; <strong>${compareStatus}</strong>.`;
  }

  return `Server result <strong>${serverResult}</strong>; recomputed result <strong>${result.result}</strong>; <strong>${compareStatus}</strong>.`;
}

function getPayoutCompareText(verifyContext) {
  const hasPayoutFields = [
    verifyContext.theoreticalPayoutAmount,
    verifyContext.actualPayoutAmount,
    verifyContext.maxPayoutCapAmount,
    verifyContext.maxPayoutHitReason,
  ].some((value) => value != null && value !== "");

  if (!hasPayoutFields) {
    return t("payoutCompareNotProvided");
  }

  const reason = verifyContext.maxPayoutHitReason
    ? `; Max Payout reason <strong>${verifyContext.maxPayoutHitReason}</strong>`
    : "";

  if (currentLang === "es") {
    const spanishReason = verifyContext.maxPayoutHitReason
      ? `; motivo de Max Payout <strong>${verifyContext.maxPayoutHitReason}</strong>`
      : "";

    return `Pago teórico <strong>${optionalText(verifyContext.theoreticalPayoutAmount)}</strong>; pago real <strong>${optionalText(verifyContext.actualPayoutAmount)}</strong>; límite Max Payout <strong>${optionalText(verifyContext.maxPayoutCapAmount)}</strong>${spanishReason}.`;
  }

  return `Theoretical payout <strong>${optionalText(verifyContext.theoreticalPayoutAmount)}</strong>; actual payout <strong>${optionalText(verifyContext.actualPayoutAmount)}</strong>; Max Payout cap <strong>${optionalText(verifyContext.maxPayoutCapAmount)}</strong>${reason}.`;
}

async function computeResult() {
  const serverSeed = elements.serverSeedInput.value.trim();
  if (!serverSeed) {
    throw new Error(t("errorServerSeedEmpty"));
  }

  const nonce = parseNonce(elements.nonceInput.value);
  const result = await WheelVerifierCore.computeWheel({ serverSeed, nonce });
  const translatedResult = {
    ...result,
    result: t(result.resultKey),
  };

  return {
    ...translatedResult,
    betArea: currentVerifyContext.betArea || "",
    resultColor: currentVerifyContext.resultColor || "",
    resultColorRaw: currentVerifyContext.resultColorRaw || "",
    theoreticalPayoutAmount: currentVerifyContext.theoreticalPayoutAmount || "",
    actualPayoutAmount: currentVerifyContext.actualPayoutAmount || "",
    maxPayoutCapAmount: currentVerifyContext.maxPayoutCapAmount || "",
    maxPayoutHitReason: currentVerifyContext.maxPayoutHitReason || "",
    resultCompareValue: currentVerifyContext.resultColor
      ? currentVerifyContext.resultColor === result.colorKey ? t("resultMatched") : t("resultMismatched")
      : t("notProvided"),
    resultCompareText: getResultCompareText(translatedResult, currentVerifyContext),
    payoutCompareText: getPayoutCompareText(currentVerifyContext),
  };
}

function getOutcomeItems(selectedKey = "") {
  return [
    { key: "green", label: t("greenLabel") },
    { key: "yellow", label: t("yellowLabel") },
    { key: "pink", label: t("pinkLabel") },
    { key: "blue", label: t("blueLabel") },
    { key: "red", label: t("redLabel") },
  ].map(({ key, label }) => ({
    label,
    tone: selectedKey === key ? `hit ${key}` : key,
  }));
}

function renderIdleState() {
  renderVisuals([
    {
      label: t("outcomeLabel"),
      title: t("resultTitle"),
      description: t("resultTitle"),
      items: getOutcomeItems(),
    },
  ]);
  renderMeta([
    { label: t("commitmentLabel"), value: "--", code: true },
    { label: t("roundHashLabel"), value: "--", code: true },
    { label: t("first52Label"), value: "--", code: true },
    { label: t("randomValueLabel"), value: "--", code: true },
  ]);
  renderFormula([
    "commitment = SHA-256(server_seed)",
    "H = HMAC_SHA256(server_seed, String(nonce))",
    "x = int(H[0:13], 16)",
    "r = x / 2^52",
    "result_scale = 25",
    "bucket = floor(r * result_scale)",
    "bucket 0-9 => Green | weight 10 | 10 slots | 40% | 2.4x | RTP 96%",
    "bucket 10-17 => Yellow | weight 8 | 8 slots | 32% | 3x | RTP 96%",
    "bucket 18-21 => Pink | weight 4 | 4 slots | 16% | 6x | RTP 96%",
    "bucket 22-23 => Blue | weight 2 | 2 slots | 8% | 12x | RTP 96%",
    "bucket 24 => Red | weight 1 | 1 slot | 4% | 24x | RTP 96%",
  ]);
  renderSteps(t("initialSteps"));
}

function renderResult(result) {
  renderVisuals([
    {
      label: t("outcomeLabel"),
      title: result.result,
      description: `${t("intervalLabel")}: <strong>${result.intervalText}</strong>`,
      items: getOutcomeItems(result.colorKey),
    },
  ]);
  renderMeta([
    { label: t("commitmentLabel"), value: result.hashedServerSeed, code: true },
    { label: t("roundHashLabel"), value: result.hash, code: true },
    { label: t("first52Label"), value: result.first13Hex, code: true },
    { label: t("randomValueLabel"), value: result.r.toFixed(12), code: true },
  ]);
  renderFormula([
    "commitment = SHA-256(server_seed)",
    "H = HMAC_SHA256(server_seed, String(nonce))",
    "x = int(H[0:13], 16)",
    "r = x / 2^52",
    "result_scale = 25",
    `bucket = floor(${result.r.toFixed(12)} * ${result.resultScale}) = ${result.bucket}`,
    "bucket 0-9 => Green | weight 10 | 10 slots | 40% | 2.4x | RTP 96%",
    "bucket 10-17 => Yellow | weight 8 | 8 slots | 32% | 3x | RTP 96%",
    "bucket 18-21 => Pink | weight 4 | 4 slots | 16% | 6x | RTP 96%",
    "bucket 22-23 => Blue | weight 2 | 2 slots | 8% | 12x | RTP 96%",
    "bucket 24 => Red | weight 1 | 1 slot | 4% | 24x | RTP 96%",
  ]);
  renderSteps(GAME_CONFIG.translations[currentLang].resultBuilder(result));
}

function applyStaticTranslations() {
  document.title = t("title");
  document.documentElement.lang = currentLang;
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    node.textContent = t(node.dataset.i18n);
  });
  document.querySelectorAll("[data-i18n-html]").forEach((node) => {
    node.innerHTML = t(node.dataset.i18nHtml);
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((node) => {
    node.placeholder = t(node.dataset.i18nPlaceholder);
  });
  elements.langToggleButton.textContent = currentLang === "en" ? "Español" : "English";
}

async function handleSubmit(event) {
  if (event) {
    event.preventDefault();
  }
  try {
    setStatus("working");
    elements.copyStepsButton.disabled = true;
    currentResult = await computeResult();
    renderResult(currentResult);
    setStatus("success");
    elements.copyStepsButton.disabled = false;
  } catch (error) {
    currentResult = null;
    renderIdleState();
    renderSteps(t("errorSteps"));
    setStatus("error");
    elements.copyStepsButton.disabled = true;
  }
}

function scheduleAutoVerify() {
  clearTimeout(autoVerifyTimer);
  autoVerifyTimer = setTimeout(() => {
    handleSubmit();
  }, 220);
}

async function copySteps() {
  const steps = Array.from(elements.stepsList.querySelectorAll("li")).map(
    (item, index) => `${index + 1}. ${item.textContent.trim()}`
  );
  if (!currentResult || !steps.length) {
    return;
  }
  const content = [
    `Server Seed: ${currentResult.serverSeed}`,
    `Nonce: ${currentResult.nonce}`,
    `Hashed Server Seed: ${currentResult.hashedServerSeed}`,
    `Bucket: ${currentResult.bucket}`,
    `Result Scale: ${currentResult.resultScale}`,
    `Result: ${currentResult.result}`,
    `Server Result: ${getColorDisplay(currentResult.resultColor, currentResult.resultColorRaw)}`,
    `Result Match: ${currentResult.resultCompareValue}`,
    `Theoretical Payout: ${optionalText(currentResult.theoreticalPayoutAmount)}`,
    `Actual Payout: ${optionalText(currentResult.actualPayoutAmount)}`,
    `Max Payout Cap: ${optionalText(currentResult.maxPayoutCapAmount)}`,
    "",
    ...steps,
  ].join("\n");
  try {
    await navigator.clipboard.writeText(content);
    setStatus("copied");
  } catch (error) {
    setStatus("copyFailed");
  }
}

function setLanguage(lang) {
  currentLang = lang;
  applyStaticTranslations();
  if (currentResult) {
    handleSubmit();
  } else {
    renderIdleState();
    setStatus("idle");
  }
}

function applyInitialValues() {
  const queryState = WheelVerifierCore.parseQueryParams(window.location.search);
  currentVerifyContext = queryState;
  const hasQueryOverrides = queryState.serverSeed || queryState.nonce;

  if (hasQueryOverrides) {
    elements.serverSeedInput.value = queryState.serverSeed;
    elements.nonceInput.value = queryState.nonce;
    return true;
  }

  return false;
}

elements.form.addEventListener("submit", handleSubmit);
elements.copyStepsButton.addEventListener("click", copySteps);
elements.langToggleButton.addEventListener("click", () => {
  setLanguage(currentLang === "en" ? "es" : "en");
});
[elements.serverSeedInput, elements.nonceInput].forEach((element) => {
  element.addEventListener("input", scheduleAutoVerify);
  element.addEventListener("change", scheduleAutoVerify);
});

applyStaticTranslations();
renderIdleState();
setStatus("idle");
elements.copyStepsButton.disabled = true;
if (applyInitialValues()) {
  handleSubmit();
}
