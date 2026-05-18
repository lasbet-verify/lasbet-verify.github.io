const GAME_CONFIG = {
  translations: {
    en: {
      title: "Lasbet Provably Fair Double Verifier",
      heroTitle: "Lasbet Provably Fair Double Verifier",
      heroDescription:
        "Enter <code>server_seed</code> and <code>nonce</code> to reproduce the shared <code>RED / BLACK / GREEN</code> result for a Double round.",
      heroAsideTitle: "Double Mapping",
      heroAsideBody:
        "The verifier computes <code>HMAC_SHA256(server_seed, nonce)</code>, converts the first 52-bit value to <code>r</code>, and maps it to <code>RED</code>, <code>BLACK</code>, or <code>GREEN</code> using the documented probability intervals.",
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
        "The page follows the documented Double fairness flow exactly: commitment hash, HMAC round hash, 52-bit random value, and interval mapping.",
      commitmentLabel: "Hashed Server Seed",
      roundHashLabel: "HMAC-SHA256",
      first52Label: "First 13 Hex / 52 Bits",
      randomValueLabel: "Random Value r",
      outcomeLabel: "Round Result",
      intervalLabel: "Probability Interval",
      redLabel: "RED",
      blackLabel: "BLACK",
      greenLabel: "GREEN",
      initialSteps: [
        "Enter the revealed <strong>server_seed</strong> and the round <strong>nonce</strong>.",
        "The verifier first computes <strong>SHA-256(server_seed)</strong> to show the commitment value used before reveal.",
        "Then it computes <strong>HMAC_SHA256(server_seed, String(nonce))</strong>, derives <strong>r</strong>, and maps the result to RED / BLACK / GREEN.",
      ],
      errorSteps: [
        "Enter a valid <strong>server_seed</strong> and <strong>nonce</strong> first.",
        "<strong>Nonce</strong> must be an integer greater than or equal to <strong>0</strong>.",
        "The same <strong>server_seed</strong> and <strong>nonce</strong> must always produce the same Double result.",
      ],
      resultBuilder: ({ hashedServerSeed, hash, first13Hex, x, r, result, intervalText, inputString }) => [
        `Step 1: Compute the commitment value <strong>SHA-256(server_seed)</strong>: <strong>${hashedServerSeed}</strong>.`,
        `Step 2: Use <strong>server_seed</strong> as the HMAC key and <strong>${inputString}</strong> as the message.`,
        `Step 3: Compute <strong>H = HMAC_SHA256(server_seed, nonce)</strong>: <strong>${hash}</strong>.`,
        `Step 4: Take the first 13 hex characters (52 bits): <strong>${first13Hex}</strong>.`,
        `Step 5: Convert them to an integer: <strong>x = ${x}</strong>.`,
        `Step 6: Normalize with <strong>r = x / 2^52</strong>: <strong>${r.toFixed(12)}</strong>.`,
        `Step 7: Apply the interval mapping <strong>${intervalText}</strong>.`,
        `Step 8: Final result is <strong>${result}</strong>.`,
      ],
    },
    es: {
      title: "Lasbet Provably Fair Double Verifier",
      heroTitle: "Lasbet Provably Fair Double Verifier",
      heroDescription:
        "Ingrese <code>server_seed</code> y <code>nonce</code> para reproducir el resultado compartido <code>RED / BLACK / GREEN</code> de una ronda Double.",
      heroAsideTitle: "Mapeo de Double",
      heroAsideBody:
        "El verificador calcula <code>HMAC_SHA256(server_seed, nonce)</code>, convierte los primeros 52 bits en <code>r</code> y los mapea a <code>RED</code>, <code>BLACK</code> o <code>GREEN</code> usando los intervalos documentados.",
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
        "La página sigue exactamente el flujo documentado de justicia para Double: hash de compromiso, hash HMAC de la ronda, valor aleatorio de 52 bits y mapeo por intervalos.",
      commitmentLabel: "Hash del Server Seed",
      roundHashLabel: "HMAC-SHA256",
      first52Label: "Primeros 13 Hex / 52 Bits",
      randomValueLabel: "Valor Aleatorio r",
      outcomeLabel: "Resultado de la Ronda",
      intervalLabel: "Intervalo de Probabilidad",
      redLabel: "RED",
      blackLabel: "BLACK",
      greenLabel: "GREEN",
      initialSteps: [
        "Ingrese el <strong>server_seed</strong> revelado y el <strong>nonce</strong> de la ronda.",
        "El verificador primero calcula <strong>SHA-256(server_seed)</strong> para mostrar el valor de compromiso usado antes de revelar la semilla.",
        "Luego calcula <strong>HMAC_SHA256(server_seed, String(nonce))</strong>, deriva <strong>r</strong> y mapea el resultado a RED / BLACK / GREEN.",
      ],
      errorSteps: [
        "Primero ingrese un <strong>server_seed</strong> y <strong>nonce</strong> válidos.",
        "<strong>Nonce</strong> debe ser un entero mayor o igual a <strong>0</strong>.",
        "El mismo <strong>server_seed</strong> y <strong>nonce</strong> siempre deben producir el mismo resultado de Double.",
      ],
      resultBuilder: ({ hashedServerSeed, hash, first13Hex, x, r, result, intervalText, inputString }) => [
        `Paso 1: Calcule el valor de compromiso <strong>SHA-256(server_seed)</strong>: <strong>${hashedServerSeed}</strong>.`,
        `Paso 2: Use <strong>server_seed</strong> como clave HMAC y <strong>${inputString}</strong> como mensaje.`,
        `Paso 3: Calcule <strong>H = HMAC_SHA256(server_seed, nonce)</strong>: <strong>${hash}</strong>.`,
        `Paso 4: Tome los primeros 13 caracteres hexadecimales (52 bits): <strong>${first13Hex}</strong>.`,
        `Paso 5: Conviértalos en entero: <strong>x = ${x}</strong>.`,
        `Paso 6: Normalice con <strong>r = x / 2^52</strong>: <strong>${r.toFixed(12)}</strong>.`,
        `Paso 7: Aplique el mapeo por intervalos <strong>${intervalText}</strong>.`,
        `Paso 8: El resultado final es <strong>${result}</strong>.`,
      ],
    },
  },
};

const DEFAULT_LANG = "en";
let currentLang = DEFAULT_LANG;
let currentResult = null;
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
        chip.classList.add(item.tone);
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

async function computeResult() {
  const serverSeed = elements.serverSeedInput.value.trim();
  if (!serverSeed) {
    throw new Error(t("errorServerSeedEmpty"));
  }

  const nonce = parseNonce(elements.nonceInput.value);
  const result = await DoubleVerifierCore.computeDouble({ serverSeed, nonce });

  return {
    ...result,
    result: t(result.resultKey),
  };
}

function renderIdleState() {
  renderVisuals([
    {
      label: t("outcomeLabel"),
      title: t("resultTitle"),
      description: t("resultTitle"),
      items: [{ label: t("redLabel") }, { label: t("blackLabel") }, { label: t("greenLabel") }],
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
    "0 <= r < 0.475 => RED",
    "0.475 <= r < 0.95 => BLACK",
    "0.95 <= r < 1 => GREEN",
  ]);
  renderSteps(t("initialSteps"));
}

function renderResult(result) {
  renderVisuals([
    {
      label: t("outcomeLabel"),
      title: result.result,
      description: `${t("intervalLabel")}: <strong>${result.intervalText}</strong>`,
      items: [
        { label: t("redLabel"), tone: result.resultKey === "redLabel" ? "hit" : "" },
        { label: t("blackLabel"), tone: result.resultKey === "blackLabel" ? "hit" : "" },
        { label: t("greenLabel"), tone: result.resultKey === "greenLabel" ? "hit" : "" },
      ],
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
    "if r < 0.475 => RED",
    "else if r < 0.95 => BLACK",
    "else => GREEN",
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
    `Result: ${currentResult.result}`,
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
  const queryState = DoubleVerifierCore.parseQueryParams(window.location.search);
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
