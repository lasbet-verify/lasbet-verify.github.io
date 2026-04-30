const GAME_CONFIG = {
  demo: {
    serverSeed: "8f0d1c3bb8f4a6c1f9d3e7ab91c4275e8f0d1c3bb8f4a6c1f9d3e7ab91c4275e",
    clientSeed: "lasbet-penalty-player",
    nonce: 12,
    roundIndex: 3,
    mode: "3",
    playerDirection: "1",
  },
  directionMap: {
    2: ["LEFT", "RIGHT"],
    3: ["LEFT", "CENTER", "RIGHT"],
    5: ["LEFT_TOP", "LEFT_BOTTOM", "CENTER", "RIGHT_TOP", "RIGHT_BOTTOM"],
  },
  translations: {
    en: {
      title: "Lasbet Provably Fair Penalty Verifier",
      heroTitle: "Lasbet Provably Fair Penalty Verifier",
      heroDescription:
        "Enter <code>server_seed</code>, <code>client_seed</code>, <code>nonce</code>, <code>round_index</code>, and <code>mode</code> to reproduce the keeper direction and check the round outcome.",
      heroAsideTitle: "Verification Logic",
      heroAsideBody:
        "This page follows the committed seed flow: first derive <code>hashed_server_seed = SHA-256(server_seed)</code>, then calculate <code>H = SHA-256(server_seed:client_seed:nonce:round_index)</code>, convert it to <code>r</code>, and map it to a keeper direction.",
      inputTitle: "Input Parameters",
      serverSeedLabel: "Server Seed",
      clientSeedLabel: "Client Seed",
      nonceLabel: "Nonce",
      roundIndexLabel: "Round Index",
      modeLabel: "Mode",
      playerDirectionLabel: "Player Direction",
      mode2Label: "2 Directions",
      mode3Label: "3 Directions",
      mode5Label: "5 Directions",
      serverSeedPlaceholder: "Example: b8f4a6c1f9d3e7...",
      clientSeedPlaceholder: "Example: player-seed-2026",
      copyButton: "Copy Verification Steps",
      resultTitle: "Verification Result",
      formulaLabel: "Calculation Formula",
      stepsTitle: "Verification Steps",
      stepsHint: "Every calculation is listed",
      statusIdle: "Waiting for input",
      statusWorking: "Calculating",
      statusSuccess: "Verification complete",
      statusError: "Invalid input",
      statusCopied: "Steps copied",
      statusCopyFailed: "Copy failed",
      resultIdle: "Enter the round parameters to verify the keeper direction.",
      errorServerSeedEmpty: "Server Seed cannot be empty.",
      errorClientSeedEmpty: "Client Seed cannot be empty.",
      errorNonceEmpty: "Nonce cannot be empty.",
      errorRoundIndexEmpty: "Round Index cannot be empty.",
      errorNonceInvalid: "Nonce must be an integer greater than or equal to 0.",
      errorRoundIndexInvalid: "Round Index must be an integer greater than or equal to 0.",
      formulaNote:
        "The page uses SHA-256 exactly once for the commitment value and once for the round random source.",
      initialSteps: [
        "Enter the public <strong>server_seed</strong>, <strong>client_seed</strong>, <strong>nonce</strong>, <strong>mode</strong>, and <strong>round_index</strong>.",
        "The verifier first computes <strong>hashed_server_seed = SHA-256(server_seed)</strong> to match the pre-game commitment flow.",
        "Then it computes the round hash, derives <strong>r</strong>, maps the keeper direction, and compares it with the player direction.",
      ],
      errorSteps: [
        "Enter a valid <strong>server_seed</strong>, <strong>client_seed</strong>, <strong>nonce</strong>, and <strong>round_index</strong> first.",
        "<strong>Nonce</strong> and <strong>Round Index</strong> must be integers greater than or equal to <strong>0</strong>.",
        "The selected mode controls how many directions are available: <strong>2</strong>, <strong>3</strong>, or <strong>5</strong>.",
      ],
      keeperDirectionLabel: "Keeper Direction",
      playerSelectionLabel: "Player Selection",
      outcomeLabel: "Round Outcome",
      keeperDirectionTitle: "Direction Verification",
      keeperDirectionBody:
        "The keeper direction is derived from the hash. If it matches the player direction, the round is <strong>LOSE</strong>; otherwise it is <strong>WIN</strong>.",
      commitmentLabel: "Commitment",
      roundHashLabel: "Round Hash",
      normalizedLabel: "Normalized r",
      directionIndexLabel: "Direction Index",
      resultWin: "WIN",
      resultLose: "LOSE",
      stepsBuilder: ({ inputString, hashedServerSeed, hash, x, r, directionIndex, keeperDirection, playerDirection, outcome, mode }) => [
        `Step 1: Build the round input as <strong>${inputString}</strong>.`,
        `Step 2: Compute the commitment value <strong>hashed_server_seed = SHA-256(server_seed)</strong>: <strong>${hashedServerSeed}</strong>.`,
        `Step 3: Compute the round hash <strong>H = SHA-256(server_seed:client_seed:nonce:round_index)</strong>: <strong>${hash}</strong>.`,
        `Step 4: Take the first 8 hex characters of <strong>H</strong> and convert them to an integer: <strong>x = ${x}</strong>.`,
        `Step 5: Normalize with <strong>r = x / 2^32</strong>: <strong>${r.toFixed(12)}</strong>.`,
        `Step 6: Use the selected mode <strong>N = ${mode}</strong> and calculate <strong>direction = floor(r * N)</strong>: <strong>${directionIndex}</strong>.`,
        `Step 7: Map the direction index to the keeper direction: <strong>${keeperDirection}</strong>.`,
        `Step 8: Compare with the player direction <strong>${playerDirection}</strong>. Final result: <strong>${outcome}</strong>.`,
      ],
    },
    es: {
      title: "Lasbet Provably Fair Penalty Verifier",
      heroTitle: "Lasbet Provably Fair Penalty Verifier",
      heroDescription:
        "Ingrese <code>server_seed</code>, <code>client_seed</code>, <code>nonce</code>, <code>round_index</code> y <code>mode</code> para reproducir la dirección del portero y verificar el resultado de la ronda.",
      heroAsideTitle: "Lógica de Verificación",
      heroAsideBody:
        "Esta página sigue el flujo de semilla comprometida: primero deriva <code>hashed_server_seed = SHA-256(server_seed)</code>, luego calcula <code>H = SHA-256(server_seed:client_seed:nonce:round_index)</code>, lo convierte en <code>r</code> y lo mapea a una dirección del portero.",
      inputTitle: "Parámetros de Entrada",
      serverSeedLabel: "Server Seed",
      clientSeedLabel: "Client Seed",
      nonceLabel: "Nonce",
      roundIndexLabel: "Round Index",
      modeLabel: "Mode",
      playerDirectionLabel: "Dirección del Jugador",
      mode2Label: "2 Direcciones",
      mode3Label: "3 Direcciones",
      mode5Label: "5 Direcciones",
      serverSeedPlaceholder: "Ejemplo: b8f4a6c1f9d3e7...",
      clientSeedPlaceholder: "Ejemplo: player-seed-2026",
      copyButton: "Copiar Pasos de Verificación",
      resultTitle: "Resultado de Verificación",
      formulaLabel: "Fórmula de Cálculo",
      stepsTitle: "Pasos de Verificación",
      stepsHint: "Se muestra cada cálculo",
      statusIdle: "Esperando datos",
      statusWorking: "Calculando",
      statusSuccess: "Verificación completa",
      statusError: "Entrada no válida",
      statusCopied: "Pasos copiados",
      statusCopyFailed: "Error al copiar",
      resultIdle: "Ingrese los parámetros de la ronda para verificar la dirección del portero.",
      errorServerSeedEmpty: "Server Seed no puede estar vacío.",
      errorClientSeedEmpty: "Client Seed no puede estar vacío.",
      errorNonceEmpty: "Nonce no puede estar vacío.",
      errorRoundIndexEmpty: "Round Index no puede estar vacío.",
      errorNonceInvalid: "Nonce debe ser un entero mayor o igual a 0.",
      errorRoundIndexInvalid: "Round Index debe ser un entero mayor o igual a 0.",
      formulaNote:
        "La página usa SHA-256 exactamente una vez para el valor de compromiso y una vez para la fuente aleatoria de la ronda.",
      initialSteps: [
        "Ingrese <strong>server_seed</strong>, <strong>client_seed</strong>, <strong>nonce</strong>, <strong>mode</strong> y <strong>round_index</strong>.",
        "El verificador primero calcula <strong>hashed_server_seed = SHA-256(server_seed)</strong> para coincidir con el compromiso previo a la partida.",
        "Luego calcula el hash de la ronda, deriva <strong>r</strong>, mapea la dirección del portero y la compara con la dirección del jugador.",
      ],
      errorSteps: [
        "Primero ingrese un <strong>server_seed</strong>, <strong>client_seed</strong>, <strong>nonce</strong> y <strong>round_index</strong> válidos.",
        "<strong>Nonce</strong> y <strong>Round Index</strong> deben ser enteros mayores o iguales a <strong>0</strong>.",
        "El modo seleccionado controla cuántas direcciones están disponibles: <strong>2</strong>, <strong>3</strong> o <strong>5</strong>.",
      ],
      keeperDirectionLabel: "Dirección del Portero",
      playerSelectionLabel: "Selección del Jugador",
      outcomeLabel: "Resultado de la Ronda",
      keeperDirectionTitle: "Verificación de Dirección",
      keeperDirectionBody:
        "La dirección del portero se deriva del hash. Si coincide con la dirección del jugador, la ronda es <strong>LOSE</strong>; de lo contrario es <strong>WIN</strong>.",
      commitmentLabel: "Compromiso",
      roundHashLabel: "Hash de la Ronda",
      normalizedLabel: "r Normalizado",
      directionIndexLabel: "Índice de Dirección",
      resultWin: "WIN",
      resultLose: "LOSE",
      stepsBuilder: ({ inputString, hashedServerSeed, hash, x, r, directionIndex, keeperDirection, playerDirection, outcome, mode }) => [
        `Paso 1: Construya la entrada de la ronda como <strong>${inputString}</strong>.`,
        `Paso 2: Calcule el valor de compromiso <strong>hashed_server_seed = SHA-256(server_seed)</strong>: <strong>${hashedServerSeed}</strong>.`,
        `Paso 3: Calcule el hash de la ronda <strong>H = SHA-256(server_seed:client_seed:nonce:round_index)</strong>: <strong>${hash}</strong>.`,
        `Paso 4: Tome los primeros 8 caracteres hexadecimales de <strong>H</strong> y conviértalos en entero: <strong>x = ${x}</strong>.`,
        `Paso 5: Normalice con <strong>r = x / 2^32</strong>: <strong>${r.toFixed(12)}</strong>.`,
        `Paso 6: Use el modo seleccionado <strong>N = ${mode}</strong> y calcule <strong>direction = floor(r * N)</strong>: <strong>${directionIndex}</strong>.`,
        `Paso 7: Mapee el índice a la dirección del portero: <strong>${keeperDirection}</strong>.`,
        `Paso 8: Compare con la dirección del jugador <strong>${playerDirection}</strong>. Resultado final: <strong>${outcome}</strong>.`,
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
  clientSeedInput: document.querySelector("#clientSeedInput"),
  nonceInput: document.querySelector("#nonceInput"),
  roundIndexInput: document.querySelector("#roundIndexInput"),
  modeInput: document.querySelector("#modeInput"),
  playerDirectionInput: document.querySelector("#playerDirectionInput"),
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

function renderVisuals(items) {
  elements.visualGrid.innerHTML = "";
  items.forEach((block) => {
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

async function sha256Hex(input) {
  const digest = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(input)
  );
  return Array.from(new Uint8Array(digest), (byte) =>
    byte.toString(16).padStart(2, "0")
  ).join("");
}

function parseNonNegativeInteger(value, errorKey, emptyKey) {
  if (!value.trim()) {
    throw new Error(t(emptyKey));
  }
  if (!/^\d+$/.test(value.trim())) {
    throw new Error(t(errorKey));
  }
  return Number(value.trim());
}

function firstDefined(...values) {
  return values.find((value) => value != null && value !== "");
}

function normalizeMode(value) {
  const mode = String(value || "").trim();
  return GAME_CONFIG.directionMap[mode] ? mode : GAME_CONFIG.demo.mode;
}

function getDirectionOptions(mode) {
  return GAME_CONFIG.directionMap[normalizeMode(mode)];
}

function normalizeDirectionValue(value) {
  return String(value || "")
    .trim()
    .toUpperCase()
    .replace(/[\s-]+/g, "_");
}

function normalizeDirectionIndex(value, mode) {
  const rawValue = String(value == null ? "" : value).trim();
  if (!rawValue) return "";

  const options = getDirectionOptions(mode);
  if (/^\d+$/.test(rawValue)) {
    return options[Number(rawValue)] ? rawValue : "0";
  }

  const directionIndex = options.indexOf(normalizeDirectionValue(rawValue));
  return directionIndex >= 0 ? String(directionIndex) : "0";
}

function parseQueryParams(search) {
  const params = new URLSearchParams(search || "");
  const mode = normalizeMode(firstDefined(params.get("m"), params.get("mode")));
  const directionRaw = firstDefined(
    params.get("d"),
    params.get("direction"),
    params.get("player_direction"),
    params.get("playerDirection"),
    params.get("player")
  );

  return {
    lang: params.get("lang") === "es" ? "es" : DEFAULT_LANG,
    serverSeed: firstDefined(params.get("s"), params.get("server_seed"), params.get("serverSeed")) || "",
    clientSeed: firstDefined(params.get("c"), params.get("client_seed"), params.get("clientSeed")) || "",
    nonce: firstDefined(params.get("n"), params.get("nonce")) || "",
    roundIndex:
      firstDefined(
        params.get("r"),
        params.get("round_index"),
        params.get("roundIndex"),
        params.get("round")
      ) || "",
    mode,
    playerDirection: normalizeDirectionIndex(directionRaw, mode),
  };
}

function syncDirectionOptions() {
  const mode = elements.modeInput.value;
  const options = getDirectionOptions(mode);
  const previousValue = elements.playerDirectionInput.value;
  elements.playerDirectionInput.innerHTML = "";
  options.forEach((option, index) => {
    const node = document.createElement("option");
    node.value = String(index);
    node.textContent = option;
    elements.playerDirectionInput.appendChild(node);
  });
  if (previousValue !== "" && options[Number(previousValue)]) {
    elements.playerDirectionInput.value = previousValue;
  } else {
    elements.playerDirectionInput.value = "0";
  }
}

function buildIdleVisuals() {
  return [
    {
      label: t("keeperDirectionLabel"),
      title: t("keeperDirectionTitle"),
      description: t("keeperDirectionBody"),
      items: [
        { label: "--" },
        { label: "--" },
        { label: "--" },
      ],
    },
  ];
}

function renderIdleState() {
  renderVisuals(buildIdleVisuals());
  renderMeta([
    { label: t("commitmentLabel"), value: "--", code: true },
    { label: t("roundHashLabel"), value: "--", code: true },
    { label: t("normalizedLabel"), value: "--", code: true },
    { label: t("directionIndexLabel"), value: "--", code: false },
  ]);
  renderFormula([
    "hashed_server_seed = SHA-256(server_seed)",
    "H = SHA-256(server_seed:client_seed:nonce:round_index)",
    "x = int(H[0:8], 16)",
    "r = x / 2^32",
    "direction = floor(r * mode)",
    "if player_direction === keeper_direction => LOSE else WIN",
  ]);
  renderSteps(t("initialSteps"));
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
  syncDirectionOptions();
  elements.langToggleButton.textContent = currentLang === "en" ? "Español" : "English";
}

async function computeResult() {
  const serverSeed = elements.serverSeedInput.value.trim();
  const clientSeed = elements.clientSeedInput.value.trim();
  if (!serverSeed) {
    throw new Error(t("errorServerSeedEmpty"));
  }
  if (!clientSeed) {
    throw new Error(t("errorClientSeedEmpty"));
  }
  const nonce = parseNonNegativeInteger(elements.nonceInput.value, "errorNonceInvalid", "errorNonceEmpty");
  const roundIndex = parseNonNegativeInteger(elements.roundIndexInput.value, "errorRoundIndexInvalid", "errorRoundIndexEmpty");
  const mode = Number(elements.modeInput.value);
  const playerDirectionIndex = Number(elements.playerDirectionInput.value);
  const options = getDirectionOptions(String(mode));
  const playerDirection = options[playerDirectionIndex];

  const commitment = await sha256Hex(serverSeed);
  const inputString = `${serverSeed}:${clientSeed}:${nonce}:${roundIndex}`;
  const hash = await sha256Hex(inputString);
  const x = parseInt(hash.slice(0, 8), 16);
  const r = x / 2 ** 32;
  const directionIndex = Math.floor(r * mode);
  const keeperDirection = options[directionIndex];
  const outcomeKey = playerDirectionIndex === directionIndex ? "resultLose" : "resultWin";
  const outcome = t(outcomeKey);

  return {
    serverSeed,
    clientSeed,
    nonce,
    roundIndex,
    mode,
    playerDirection,
    playerDirectionIndex,
    hashedServerSeed: commitment,
    inputString,
    hash,
    x,
    r,
    directionIndex,
    keeperDirection,
    outcomeKey,
    outcome,
  };
}

function renderResult(result) {
  const localizedOutcome = t(result.outcomeKey);
  renderVisuals([
    {
      label: t("keeperDirectionLabel"),
      title: t("keeperDirectionTitle"),
      description: t("keeperDirectionBody"),
      items: [
        { label: `${t("keeperDirectionLabel")}: ${result.keeperDirection}`, tone: result.outcomeKey === "resultLose" ? "mine" : "hit" },
        { label: `${t("playerSelectionLabel")}: ${result.playerDirection}` },
        { label: `${t("outcomeLabel")}: ${localizedOutcome}`, tone: result.outcomeKey === "resultWin" ? "hit" : "mine" },
      ],
    },
  ]);
  renderMeta([
    { label: t("commitmentLabel"), value: result.hashedServerSeed, code: true },
    { label: t("roundHashLabel"), value: result.hash, code: true },
    { label: t("normalizedLabel"), value: result.r.toFixed(12), code: true },
    { label: t("directionIndexLabel"), value: String(result.directionIndex), code: false },
  ]);
  renderFormula([
    "hashed_server_seed = SHA-256(server_seed)",
    "H = SHA-256(server_seed:client_seed:nonce:round_index)",
    "x = int(H[0:8], 16)",
    "r = x / 2^32",
    "direction = floor(r * mode)",
    "if player_direction === keeper_direction => LOSE else WIN",
  ]);
  renderSteps(GAME_CONFIG.translations[currentLang].stepsBuilder({ ...result, outcome: localizedOutcome }));
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
    `Client Seed: ${currentResult.clientSeed}`,
    `Nonce: ${currentResult.nonce}`,
    `Round Index: ${currentResult.roundIndex}`,
    `Mode: ${currentResult.mode}`,
    `Player Direction: ${currentResult.playerDirection}`,
    `Keeper Direction: ${currentResult.keeperDirection}`,
    `Result: ${t(currentResult.outcomeKey)}`,
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
    renderResult(currentResult);
    setStatus("success");
  } else {
    renderIdleState();
    setStatus("idle");
  }
}

function applyInitialValues(initialState) {
  const queryState = initialState || parseQueryParams(window.location.search);
  const hasQueryOverrides =
    queryState.serverSeed ||
    queryState.clientSeed ||
    queryState.nonce ||
    queryState.roundIndex ||
    queryState.mode ||
    queryState.playerDirection;

  elements.serverSeedInput.value = hasQueryOverrides && queryState.serverSeed
    ? queryState.serverSeed
    : GAME_CONFIG.demo.serverSeed;
  elements.clientSeedInput.value = hasQueryOverrides && queryState.clientSeed
    ? queryState.clientSeed
    : GAME_CONFIG.demo.clientSeed;
  elements.nonceInput.value = hasQueryOverrides && queryState.nonce
    ? queryState.nonce
    : GAME_CONFIG.demo.nonce;
  elements.roundIndexInput.value = hasQueryOverrides && queryState.roundIndex
    ? queryState.roundIndex
    : GAME_CONFIG.demo.roundIndex;
  elements.modeInput.value = hasQueryOverrides ? queryState.mode : GAME_CONFIG.demo.mode;
  syncDirectionOptions();
  elements.playerDirectionInput.value = hasQueryOverrides && queryState.playerDirection
    ? queryState.playerDirection
    : GAME_CONFIG.demo.playerDirection;
}

elements.form.addEventListener("submit", handleSubmit);
elements.copyStepsButton.addEventListener("click", copySteps);
elements.langToggleButton.addEventListener("click", () => {
  setLanguage(currentLang === "en" ? "es" : "en");
});
elements.modeInput.addEventListener("change", () => {
  syncDirectionOptions();
  scheduleAutoVerify();
});
[
  elements.serverSeedInput,
  elements.clientSeedInput,
  elements.nonceInput,
  elements.roundIndexInput,
  elements.playerDirectionInput,
].forEach((element) => {
  element.addEventListener("input", scheduleAutoVerify);
  element.addEventListener("change", scheduleAutoVerify);
});

const initialState = parseQueryParams(window.location.search);
currentLang = initialState.lang;
applyStaticTranslations();
renderIdleState();
setStatus("idle");
elements.copyStepsButton.disabled = true;
applyInitialValues(initialState);
handleSubmit();
