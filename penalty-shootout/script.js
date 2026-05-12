const DEFAULT_ROUND_STEPS = 5;
const DEFAULT_START_NONCE = 0;
const DEFAULT_ROUND_INDEX = 0;
const DEFAULT_MODE = 5;
const DIRECTION_MAP = {
  2: ["LEFT", "RIGHT"],
  3: ["LEFT", "CENTER", "RIGHT"],
  5: ["LEFT_TOP", "LEFT_BOTTOM", "CENTER", "RIGHT_TOP", "RIGHT_BOTTOM"],
};

const DEMO_INPUT = {
  serverSeed:
    "8f0d1c3bb8f4a6c1f9d3e7ab91c4275e8f0d1c3bb8f4a6c1f9d3e7ab91c4275e",
  clientSeed: "lasbet-penalty-player",
  nonce: DEFAULT_START_NONCE,
  roundIndex: DEFAULT_ROUND_INDEX,
  mode: DEFAULT_MODE,
  steps: DEFAULT_ROUND_STEPS,
};

const I18N = {
  es: {
    pageTitle: "Penalty Verification Page",
    eyebrow: "Provably Fair Verifier",
    heroTitle: "Penalty Verification Page",
    heroBody:
      "Ingresa <strong>Server Seed</strong> y <strong>Client Seed</strong> para reconstruir la ronda usando el algoritmo definido en <code>验证算法.md</code>.",
    heroList: [

    ],
    calloutTitle: "Regla actual",
    calloutBody:
      "Cada paso usa <code>HMAC_SHA256(server_seed, client_seed:nonce)</code>, toma los primeros <code>13</code> hex, normaliza con <code>r = x / 2^52</code> y mapea el resultado a objetivos.",
    inputSectionLabel: "Input",
    inputTitle: "Datos de verificación",
    inputHelper:
      "Después de ingresar los seeds, la página recalcula todos los resultados automáticamente.",
    serverSeedLabel: "Server Seed",
    clientSeedLabel: "Client Seed",
    serverSeedPlaceholder: "Server seed revelado",
    clientSeedPlaceholder: "Client seed del jugador",
    copyButton: "Copiar resultados",
    advancedTitle: "Información avanzada",
    advancedNote: "Aquí se muestra el HMAC completo del paso 1.",
    summarySectionLabel: "Summary",
    summaryTitle: "Resumen de resultados",
    singleSectionLabel: "Single Point",
    singleTitle: "Verificación de un paso",
    sequenceSectionLabel: "Sequence",
    sequenceTitle: "Secuencia de la ronda",
    tableSectionLabel: "Round Verify",
    tableTitle: "Tabla de cálculo por paso",
    formulaSectionLabel: "Formula",
    formulaTitle: "Pasos de cálculo",
    logicTitle: "Lógica de generación",
    formulaCardTitle: "Fórmulas clave",
    mappingTitle: "Mapeo de direcciones",
    languageSectionLabel: "Language",
    languageTitle: "Idioma",
    statusIdle: "Esperando entrada",
    statusWorking: "Calculando",
    statusSuccess: "Verificación completa",
    statusCopied: "Resultados copiados",
    statusCopyFailed: "Error al copiar",
    errorServerSeed: "Server Seed no puede estar vacío",
    errorClientSeed: "Client Seed no puede estar vacío",
    summaryItems: {
      betId: "ID local de la ronda generado con server/client seed",
      nonce: "Rango de nonce usado en esta ronda",
      roundIndex: "Índice externo de ronda. Si no se envía, usa 0",
      mode: "Modo externo de direcciones. Valores soportados: 2, 3, 5",
      playerDirection: "Dirección elegida por el jugador para comparar el paso 1",
      outcome: "Resultado del paso 1 comparado con la dirección del jugador",
      steps: "Cantidad de pasos recibida desde parámetros externos",
      seedHash: "Valor de compromiso del server seed",
      hmac: "HMAC completo del paso 1",
    },
    singleLabels: {
      message: "Message",
      hmac: "hmac_sha256",
      outcome: "Resultado",
    },
    idleSingle:
      'Ingresa <code>Server Seed</code> y <code>Client Seed</code> para ver el detalle del paso 1.',
    idleSequence: "La secuencia de objetivos aparecerá aquí.",
    idleTable:
      "La tabla mostrará el cálculo completo de cada paso de la ronda.",
    stepsIntro: [
      "Ingresa <strong>Server Seed</strong> y <strong>Client Seed</strong>.",
      "Genera la cantidad de pasos recibida por <strong>steps</strong>, empezando desde <strong>nonce</strong>.",
      "Cada paso calcula <strong>HMAC_SHA256(server_seed, client_seed:nonce)</strong>.",
      "Se toma <strong>hash[0:13]</strong>, se calcula <strong>r = x / 2^52</strong> y luego se mapea el objetivo.",
    ],
    formulas: [
      "<code>message = `${client_seed}:${nonce}`</code>",
      "<code>hash = HMAC_SHA256(server_seed, message)</code>",
      "<code>x = parseInt(hash.slice(0, 13), 16)</code>",
      "<code>r = x / 2^52</code>",
      "<code>direction = floor(r * mode)</code>",
    ],
    directionModes: [
      "<strong>Dos direcciones (2)</strong><br>0 → LEFT<br>1 → RIGHT",
      "<strong>Tres direcciones (3)</strong><br>0 → LEFT<br>1 → CENTER<br>2 → RIGHT",
      "<strong>Cinco direcciones (5)</strong><br>0 → LEFT_TOP<br>1 → LEFT_BOTTOM<br>2 → CENTER<br>3 → RIGHT_TOP<br>4 → RIGHT_BOTTOM",
    ],
    renderSteps: (result) => [
      `Paso 1: calcula <code>sha256(server_seed)</code> = <code>${result.serverSeedHash}</code>.`,
      `Paso 2: genera <code>Bet ID</code> = <code>${result.betId}</code>.`,
      `Paso 3: usa nonce de <code>${result.startNonce}</code> a <code>${result.startNonce + result.steps - 1}</code>.`,
      "Paso 4: en cada paso usa <code>message = client_seed:nonce</code> y calcula <code>HMAC_SHA256(server_seed, message)</code>.",
      "Paso 5: toma los primeros 13 hex, los convierte a entero y calcula <code>r = x / 2^52</code>.",
      `Paso 6: usa <code>floor(r * ${result.mode})</code> para obtener el índice final y mapearlo al target.`,
    ],
    thStep: "Steps",
    thNonce: "Nonce",
    thMessage: "Message",
    thHmac: "hmac_sha256",
    thX: "X(First13)",
    thR: "r",
    thTargetIndex: "Target Index",
    thTargets: "Targets",
  },
  en: {
    pageTitle: "Penalty Verification Page",
    eyebrow: "Provably Fair Verifier",
    heroTitle: "Penalty Verification Page",
    heroBody:
      "Enter <strong>Server Seed</strong> and <strong>Client Seed</strong> to reconstruct the round using the algorithm defined in <code>验证算法.md</code>.",
    heroList: [
      "Only <code>Server Seed</code> and <code>Client Seed</code> are required.",
      "The page calculates automatically while you type, without a verify button.",
      "The round uses <code>5</code> steps with nonce from <code>0</code> to <code>4</code>.",
    ],
    calloutTitle: "Current Rule",
    calloutBody:
      "Each step uses <code>HMAC_SHA256(server_seed, client_seed:nonce)</code>, takes the first <code>13</code> hex characters, normalizes with <code>r = x / 2^52</code>, and maps the result to targets.",
    inputSectionLabel: "Input",
    inputTitle: "Verification Input",
    inputHelper:
      "After entering the seeds, the page recalculates all results automatically.",
    serverSeedLabel: "Server Seed",
    clientSeedLabel: "Client Seed",
    serverSeedPlaceholder: "Revealed server seed",
    clientSeedPlaceholder: "Player client seed",
    copyButton: "Copy Results",
    advancedTitle: "Advanced Information",
    advancedNote: "This shows the full HMAC for step 1.",
    summarySectionLabel: "Summary",
    summaryTitle: "Result Summary",
    singleSectionLabel: "Single Point",
    singleTitle: "Single-Step Verification",
    sequenceSectionLabel: "Sequence",
    sequenceTitle: "Round Sequence",
    tableSectionLabel: "Round Verify",
    tableTitle: "Step-by-Step Calculation Table",
    formulaSectionLabel: "Formula",
    formulaTitle: "Calculation Steps",
    logicTitle: "Generation Logic",
    formulaCardTitle: "Key Formulas",
    mappingTitle: "Direction Mapping",
    languageSectionLabel: "Language",
    languageTitle: "Language",
    statusIdle: "Waiting for input",
    statusWorking: "Calculating",
    statusSuccess: "Verification complete",
    statusCopied: "Results copied",
    statusCopyFailed: "Copy failed",
    errorServerSeed: "Server Seed cannot be empty",
    errorClientSeed: "Client Seed cannot be empty",
    summaryItems: {
      betId: "Local round identifier generated from server/client seed",
      nonce: "Nonce range used in this round",
      roundIndex: "External round index. Defaults to 0 when omitted",
      mode: "External direction mode. Supported values: 2, 3, 5",
      playerDirection: "Player direction used to compare step 1",
      outcome: "Step 1 result compared with the player direction",
      steps: "Step count received from external parameters",
      seedHash: "Server seed commitment value",
      hmac: "Full HMAC for step 1",
    },
    singleLabels: {
      message: "Message",
      hmac: "hmac_sha256",
      outcome: "Outcome",
    },
    idleSingle:
      'Enter <code>Server Seed</code> and <code>Client Seed</code> to see the step 1 detail.',
    idleSequence: "The target sequence will appear here.",
    idleTable: "The table will display the full calculation for every round step.",
    stepsIntro: [
      "Enter <strong>Server Seed</strong> and <strong>Client Seed</strong>.",
      "Generate the step count received through <strong>steps</strong>, starting from <strong>nonce</strong>.",
      "Each step calculates <strong>HMAC_SHA256(server_seed, client_seed:nonce)</strong>.",
      "Take <strong>hash[0:13]</strong>, compute <strong>r = x / 2^52</strong>, and then map the target.",
    ],
    formulas: [
      "<code>message = `${client_seed}:${nonce}`</code>",
      "<code>hash = HMAC_SHA256(server_seed, message)</code>",
      "<code>x = parseInt(hash.slice(0, 13), 16)</code>",
      "<code>r = x / 2^52</code>",
      "<code>direction = floor(r * mode)</code>",
    ],
    directionModes: [
      "<strong>Two Directions (2)</strong><br>0 → LEFT<br>1 → RIGHT",
      "<strong>Three Directions (3)</strong><br>0 → LEFT<br>1 → CENTER<br>2 → RIGHT",
      "<strong>Five Directions (5)</strong><br>0 → LEFT_TOP<br>1 → LEFT_BOTTOM<br>2 → CENTER<br>3 → RIGHT_TOP<br>4 → RIGHT_BOTTOM",
    ],
    renderSteps: (result) => [
      `Step 1: calculate <code>sha256(server_seed)</code> = <code>${result.serverSeedHash}</code>.`,
      `Step 2: generate <code>Bet ID</code> = <code>${result.betId}</code>.`,
      `Step 3: use nonce from <code>${result.startNonce}</code> to <code>${result.startNonce + result.steps - 1}</code>.`,
      "Step 4: for each step use <code>message = client_seed:nonce</code> and calculate <code>HMAC_SHA256(server_seed, message)</code>.",
      "Step 5: take the first 13 hex characters, convert them to an integer, and compute <code>r = x / 2^52</code>.",
      `Step 6: use <code>floor(r * ${result.mode})</code> to get the final index and map it to the target.`,
    ],
    thStep: "Steps",
    thNonce: "Nonce",
    thMessage: "Message",
    thHmac: "hmac_sha256",
    thX: "X(First13)",
    thR: "r",
    thTargetIndex: "Target Index",
    thTargets: "Targets",
  },
};

const elements = {
  form: document.querySelector("#verifierForm"),
  serverSeedInput: document.querySelector("#serverSeedInput"),
  clientSeedInput: document.querySelector("#clientSeedInput"),
  copyButton: document.querySelector("#copyStepsButton"),
  statusPill: document.querySelector("#statusPill"),
  summaryGrid: document.querySelector("#summaryGrid"),
  betIdOutput: document.querySelector("#betIdOutput"),
  serverSeedHashOutput: document.querySelector("#serverSeedHashOutput"),
  nonceOutput: document.querySelector("#nonceOutput"),
  stepsOutput: document.querySelector("#stepsOutput"),
  hmacOutput: document.querySelector("#hmacOutput"),
  singlePointBox: document.querySelector("#singlePointBox"),
  sequenceStrip: document.querySelector("#sequenceStrip"),
  resultTableBody: document.querySelector("#resultTableBody"),
  stepsList: document.querySelector("#stepsList"),
  formulaList: document.querySelector("#formulaList"),
  mappingBlock: document.querySelector("#mappingBlock"),
  heroList: document.querySelector("#heroList"),
  langEsButton: document.querySelector("#langEsButton"),
  langEnButton: document.querySelector("#langEnButton"),
};

let currentLang = "es";
let currentResult = null;
let autoVerifyTimer = null;

function firstDefined(...values) {
  return values.find((value) => value !== null && value !== undefined && value !== "");
}

function parseNonNegativeInteger(value, fallback) {
  const parsed = Number.parseInt(value, 10);
  return Number.isSafeInteger(parsed) && parsed >= 0 ? parsed : fallback;
}

function parsePositiveInteger(value, fallback) {
  const parsed = Number.parseInt(value, 10);
  return Number.isSafeInteger(parsed) && parsed > 0 ? parsed : fallback;
}

function normalizeMode(value) {
  const parsed = Number.parseInt(value, 10);
  return Object.prototype.hasOwnProperty.call(DIRECTION_MAP, parsed)
    ? parsed
    : DEFAULT_MODE;
}

function getTargets(mode) {
  return DIRECTION_MAP[normalizeMode(mode)];
}

function normalizeDirectionValue(value) {
  return String(value || "")
    .trim()
    .toUpperCase()
    .replace(/[\s-]+/g, "_");
}

function normalizeDirectionIndex(value, targets) {
  if (value === null || value === undefined || value === "") return "";
  const parsed = Number.parseInt(value, 10);
  if (Number.isSafeInteger(parsed) && parsed >= 0 && parsed < targets.length) {
    return targets[parsed];
  }
  const normalized = normalizeDirectionValue(value);
  return targets.includes(normalized) ? normalized : normalized;
}

function parseQueryParams(search) {
  const params = new URLSearchParams(search);
  const mode = normalizeMode(firstDefined(params.get("mode"), params.get("m")));
  const targets = getTargets(mode);
  const playerDirection = normalizeDirectionIndex(
    firstDefined(
      params.get("player_direction"),
      params.get("playerDirection"),
      params.get("direction"),
      params.get("player"),
      params.get("d")
    ),
    targets
  );

  return {
    serverSeed: firstDefined(
      params.get("server_seed"),
      params.get("serverSeed"),
      params.get("s")
    ),
    clientSeed: firstDefined(
      params.get("client_seed"),
      params.get("clientSeed"),
      params.get("c")
    ),
    nonce: parseNonNegativeInteger(
      firstDefined(params.get("nonce"), params.get("n")),
      DEFAULT_START_NONCE
    ),
    roundIndex: parseNonNegativeInteger(
      firstDefined(
        params.get("round_index"),
        params.get("roundIndex"),
        params.get("round"),
        params.get("r")
      ),
      DEFAULT_ROUND_INDEX
    ),
    mode,
    steps: parsePositiveInteger(
      firstDefined(params.get("steps"), params.get("step_count"), params.get("stepCount")),
      DEFAULT_ROUND_STEPS
    ),
    playerDirection,
    lang: firstDefined(params.get("lang"), params.get("language")),
  };
}

const queryState = parseQueryParams(window.location.search);

function t(key) {
  return I18N[currentLang][key];
}

function setStatus(tone, text) {
  elements.statusPill.className = `status-pill${tone ? ` ${tone}` : ""}`;
  elements.statusPill.textContent = text;
}

function renderHtmlList(container, items) {
  container.innerHTML = "";
  items.forEach((item) => {
    const li = document.createElement("li");
    li.innerHTML = item;
    container.appendChild(li);
  });
}

function renderMapping() {
  elements.mappingBlock.innerHTML = t("directionModes")
    .map((item) => `<div class="mapping-item">${item}</div>`)
    .join("");
}

function applyStaticTranslations() {
  document.title = t("pageTitle");
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

  renderHtmlList(elements.heroList, t("heroList"));
  renderMapping();
  elements.langEsButton.classList.toggle("is-active", currentLang === "es");
  elements.langEnButton.classList.toggle("is-active", currentLang === "en");
}

function renderSummary(items) {
  elements.summaryGrid.innerHTML = "";
  items.forEach((item) => {
    const card = document.createElement("div");
    card.className = "metric-card";
    const label = document.createElement("div");
    label.className = "metric-label";
    label.textContent = item.label;
    const value = document.createElement("div");
    value.className = "metric-value";
    if (item.code) {
      const code = document.createElement("code");
      code.textContent = item.value;
      value.appendChild(code);
    } else {
      value.textContent = item.value;
    }
    const copy = document.createElement("div");
    copy.className = "metric-copy";
    copy.textContent = item.copy;
    card.append(label, value, copy);
    elements.summaryGrid.appendChild(card);
  });
}

function renderSinglePoint(result) {
  const first = result.rows[0];
  const outcomeItems = result.playerDirection
    ? `
      <li><code>player_direction</code> = <code>${result.playerDirection}</code></li>
      <li><code>${t("singleLabels").outcome}</code> = <code>${result.outcome}</code></li>
    `
    : "";
  elements.singlePointBox.innerHTML = `
    <p class="table-note">${t("singleLabels").message}</p>
    <p class="mono">${first.message}</p>
    <p class="table-note">${t("singleLabels").hmac}</p>
    <p class="mono">${first.hmac}</p>
    <ul class="formula-list">
      <li><code>x = parseInt(hash.slice(0, 13), 16)</code> = <code>${first.normalizedSource}</code></li>
      <li><code>r = x / 2^52</code> = <code>${first.r.toFixed(12)}</code></li>
      <li><code>target = floor(r * ${result.mode})</code> = <code>${first.targetIndex}</code>, <code>${first.target}</code></li>
      ${outcomeItems}
    </ul>
  `;
}

function renderSequence(result) {
  elements.sequenceStrip.innerHTML = "";
  result.rows.forEach((row) => {
    const tile = document.createElement("div");
    tile.className = "card-tile";
    tile.innerHTML = `
      <div class="rank">${row.target}</div>
      <div class="detail">#${row.step} · nonce ${row.nonce}</div>
    `;
    elements.sequenceStrip.appendChild(tile);
  });
}

function renderTable(result) {
  elements.resultTableBody.innerHTML = "";
  result.rows.forEach((row) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <th data-label="${t("thStep")}">${row.step}</th>
      <td data-label="${t("thNonce")}">${row.nonce}</td>
      <td class="mono" data-label="${t("thMessage")}">${row.message}</td>
      <td class="mono" data-label="${t("thHmac")}">${row.hmac}</td>
      <td class="mono" data-label="${t("thX")}">${row.normalizedSource}</td>
      <td data-label="${t("thR")}">${row.r.toFixed(12)}</td>
      <td data-label="${t("thTargetIndex")}">${row.targetIndex}</td>
      <td data-label="${t("thTargets")}"><strong>${row.target}</strong></td>
    `;
    elements.resultTableBody.appendChild(tr);
  });
}

function renderIdleState() {
  renderSummary([
    { label: "Bet ID", value: "--", code: true, copy: t("summaryItems").betId },
    { label: "Nonce", value: "--", code: false, copy: t("summaryItems").nonce },
    {
      label: "Round Index",
      value: String(queryState.roundIndex),
      code: false,
      copy: t("summaryItems").roundIndex,
    },
    {
      label: "Mode",
      value: String(queryState.mode),
      code: false,
      copy: t("summaryItems").mode,
    },
    {
      label: "Steps",
      value: String(queryState.steps),
      code: false,
      copy: t("summaryItems").steps,
    },
    {
      label: "sha256(server_seed)",
      value: "--",
      code: true,
      copy: t("summaryItems").seedHash,
    },
    { label: "hmac_sha256", value: "--", code: true, copy: t("summaryItems").hmac },
  ]);

  elements.betIdOutput.value = "";
  elements.serverSeedHashOutput.value = "";
  elements.nonceOutput.value = "";
  elements.stepsOutput.value = "";
  elements.hmacOutput.value = "";

  elements.singlePointBox.innerHTML = `<div class="empty-state">${t("idleSingle")}</div>`;
  elements.sequenceStrip.innerHTML = `<div class="empty-state">${t("idleSequence")}</div>`;
  elements.resultTableBody.innerHTML = `<tr><td colspan="8" class="empty-state">${t("idleTable")}</td></tr>`;

  renderHtmlList(elements.stepsList, t("stepsIntro"));
  renderHtmlList(elements.formulaList, t("formulas"));
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

async function hmacSha256Hex(key, message) {
  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(key),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign(
    "HMAC",
    cryptoKey,
    new TextEncoder().encode(message)
  );
  return Array.from(new Uint8Array(signature), (byte) =>
    byte.toString(16).padStart(2, "0")
  ).join("");
}

async function computeResult() {
  const serverSeed = elements.serverSeedInput.value.trim();
  const clientSeed = elements.clientSeedInput.value.trim();
  const startNonce = queryState.nonce;
  const roundIndex = queryState.roundIndex;
  const mode = normalizeMode(queryState.mode);
  const steps = queryState.steps;
  const targets = getTargets(mode);
  const playerDirection = normalizeDirectionIndex(queryState.playerDirection, targets);

  if (!serverSeed) throw new Error(t("errorServerSeed"));
  if (!clientSeed) throw new Error(t("errorClientSeed"));

  const serverSeedHash = await sha256Hex(serverSeed);
  const betId = (await sha256Hex(`${serverSeed}|${clientSeed}`)).slice(0, 16);
  const rows = [];

  for (let step = 0; step < steps; step += 1) {
    const nonce = startNonce + step;
    const message = `${clientSeed}:${nonce}`;
    const hmac = await hmacSha256Hex(serverSeed, message);
    const normalizedSource = parseInt(hmac.slice(0, 13), 16);
    const r = normalizedSource / 2 ** 52;
    const targetIndex = Math.min(
      Math.floor(r * targets.length),
      targets.length - 1
    );

    rows.push({
      step: step + 1,
      nonce,
      message,
      hmac,
      normalizedSource,
      r,
      targetIndex,
      target: targets[targetIndex],
    });
  }

  const firstTarget = rows[0].target;
  const isPlayerDirectionValid = targets.includes(playerDirection);
  const outcome = isPlayerDirectionValid
    ? firstTarget === playerDirection
      ? "LOSE"
      : "WIN"
    : "";

  return {
    serverSeed,
    clientSeed,
    serverSeedHash,
    betId,
    startNonce,
    roundIndex,
    mode,
    targets,
    playerDirection,
    outcome,
    nonceText: `${startNonce} ~ ${startNonce + steps - 1}`,
    steps,
    rows,
  };
}

function renderResult(result) {
  const first = result.rows[0];
  renderSummary([
    { label: "Bet ID", value: result.betId, code: true, copy: t("summaryItems").betId },
    { label: "Nonce", value: result.nonceText, code: false, copy: t("summaryItems").nonce },
    {
      label: "Round Index",
      value: String(result.roundIndex),
      code: false,
      copy: t("summaryItems").roundIndex,
    },
    {
      label: "Mode",
      value: String(result.mode),
      code: false,
      copy: t("summaryItems").mode,
    },
    ...(result.playerDirection
      ? [
          {
            label: "Player Direction",
            value: result.playerDirection,
            code: true,
            copy: t("summaryItems").playerDirection,
          },
          {
            label: "Outcome",
            value: result.outcome,
            code: false,
            copy: t("summaryItems").outcome,
          },
        ]
      : []),
    { label: "Steps", value: String(result.steps), code: false, copy: t("summaryItems").steps },
    {
      label: "sha256(server_seed)",
      value: result.serverSeedHash,
      code: true,
      copy: t("summaryItems").seedHash,
    },
    { label: "hmac_sha256", value: first.hmac, code: true, copy: t("summaryItems").hmac },
  ]);

  elements.betIdOutput.value = result.betId;
  elements.serverSeedHashOutput.value = result.serverSeedHash;
  elements.nonceOutput.value = result.nonceText;
  elements.stepsOutput.value = String(result.steps);
  elements.hmacOutput.value = first.hmac;

  renderSinglePoint(result);
  renderSequence(result);
  renderTable(result);
  renderHtmlList(elements.stepsList, t("renderSteps")(result));
  renderHtmlList(elements.formulaList, t("formulas"));
}

async function verify(event) {
  if (event) event.preventDefault();

  try {
    setStatus("working", t("statusWorking"));
    elements.copyButton.disabled = true;
    currentResult = await computeResult();
    renderResult(currentResult);
    setStatus("success", t("statusSuccess"));
    elements.copyButton.disabled = false;
  } catch (error) {
    currentResult = null;
    renderIdleState();
    setStatus("error", error.message);
  }
}

function scheduleAutoVerify() {
  clearTimeout(autoVerifyTimer);
  autoVerifyTimer = setTimeout(() => {
    verify();
  }, 180);
}

async function copyResult() {
  if (!currentResult) return;
  const content = [
    `Server Seed: ${currentResult.serverSeed}`,
    `Client Seed: ${currentResult.clientSeed}`,
    `Bet ID: ${currentResult.betId}`,
    `Nonce: ${currentResult.nonceText}`,
    `Round Index: ${currentResult.roundIndex}`,
    `Mode: ${currentResult.mode}`,
    `Player Direction: ${currentResult.playerDirection || ""}`,
    `Outcome: ${currentResult.outcome || ""}`,
    `Steps: ${currentResult.steps}`,
    `sha256(server_seed): ${currentResult.serverSeedHash}`,
    `hmac_sha256: ${currentResult.rows[0].hmac}`,
    "",
    `Steps\tNonce\tMessage\thmac_sha256\tX(First13)\tr\tTarget Index\tTargets`,
    ...currentResult.rows.map(
      (row) =>
        `${row.step}\t${row.nonce}\t${row.message}\t${row.hmac}\t${row.normalizedSource}\t${row.r.toFixed(12)}\t${row.targetIndex}\t${row.target}`
    ),
  ].join("\n");

  try {
    await navigator.clipboard.writeText(content);
    setStatus("success", t("statusCopied"));
  } catch {
    setStatus("error", t("statusCopyFailed"));
  }
}

function setLanguage(lang) {
  currentLang = lang === "en" ? "en" : "es";
  applyStaticTranslations();
  if (currentResult) {
    renderResult(currentResult);
    setStatus("success", t("statusSuccess"));
  } else {
    renderIdleState();
    setStatus("", t("statusIdle"));
  }
}

elements.form.addEventListener("submit", verify);
elements.copyButton.addEventListener("click", copyResult);
elements.langEsButton.addEventListener("click", () => setLanguage("es"));
elements.langEnButton.addEventListener("click", () => setLanguage("en"));

[elements.serverSeedInput, elements.clientSeedInput].forEach((element) => {
  element.addEventListener("input", scheduleAutoVerify);
  element.addEventListener("change", scheduleAutoVerify);
});

if (queryState.lang) currentLang = queryState.lang === "en" ? "en" : "es";

elements.serverSeedInput.value = queryState.serverSeed || DEMO_INPUT.serverSeed;
elements.clientSeedInput.value = queryState.clientSeed || DEMO_INPUT.clientSeed;

applyStaticTranslations();
renderIdleState();
setStatus("", t("statusIdle"));
verify();
