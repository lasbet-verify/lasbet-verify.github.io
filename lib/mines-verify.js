(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory({ nodeCrypto: require('crypto') });
    return;
  }

  root.MinesVerifier = factory({ CryptoJS: root.CryptoJS });
})(typeof globalThis !== 'undefined' ? globalThis : this, function (deps) {
  const TOTAL_TILES = 25;
  const DEFAULT_RTP = 0.97;

  function ensureString(value) {
    if (value == null) return '';
    return String(value);
  }

  function sha256Hex(value) {
    const text = ensureString(value);

    if (deps.nodeCrypto) {
      return deps.nodeCrypto.createHash('sha256').update(text, 'utf8').digest('hex');
    }

    if (deps.CryptoJS) {
      return deps.CryptoJS.SHA256(deps.CryptoJS.enc.Utf8.parse(text)).toString();
    }

    throw new Error('No SHA-256 implementation available');
  }

  function hmacSha256Hex(message, key) {
    const text = ensureString(message);
    const secret = ensureString(key);

    if (deps.nodeCrypto) {
      return deps.nodeCrypto.createHmac('sha256', secret).update(text, 'utf8').digest('hex');
    }

    if (deps.CryptoJS) {
      return deps.CryptoJS.HmacSHA256(text, secret).toString();
    }

    throw new Error('No HMAC-SHA256 implementation available');
  }

  function buildCounterMessage(clientSeed, nonce, counter) {
    return ensureString(clientSeed) + ':' + ensureString(nonce) + ':' + counter;
  }

  function getRandomStep(serverSeed, clientSeed, nonce, counter) {
    const message = buildCounterMessage(clientSeed, nonce, counter);
    const hash = hmacSha256Hex(message, serverSeed);
    const numberHex = hash.slice(0, 8);
    const number = Number.parseInt(numberHex, 16);

    return {
      counter,
      message,
      hash,
      numberHex,
      number,
      random: number / Math.pow(2, 32),
    };
  }

  function generateShuffle(serverSeed, clientSeed, nonce) {
    const tiles = Array.from({ length: TOTAL_TILES }, function (_, index) {
      return index;
    });
    const steps = [];

    for (
      let currentIndex = TOTAL_TILES - 1, counter = 0;
      currentIndex > 0;
      currentIndex -= 1, counter += 1
    ) {
      const step = getRandomStep(serverSeed, clientSeed, nonce, counter);
      const swapIndex = Math.floor(step.random * (currentIndex + 1));
      const left = tiles[currentIndex];

      tiles[currentIndex] = tiles[swapIndex];
      tiles[swapIndex] = left;

      steps.push({
        counter: step.counter,
        message: step.message,
        hash: step.hash,
        numberHex: step.numberHex,
        number: step.number,
        random: step.random,
        currentIndex,
        swapIndex,
      });
    }

    return {
      tiles,
      steps,
    };
  }

  function generateTiles(serverSeed, clientSeed, nonce) {
    return generateShuffle(serverSeed, clientSeed, nonce).tiles;
  }

  function combination(total, picks) {
    if (!Number.isInteger(total) || !Number.isInteger(picks)) return 0;
    if (picks < 0 || picks > total) return 0;
    if (picks === 0 || picks === total) return 1;

    const limit = Math.min(picks, total - picks);
    let result = 1;

    for (let step = 1; step <= limit; step += 1) {
      result = (result * (total - limit + step)) / step;
    }

    return result;
  }

  function calcMultiplier(safeHits, minesCount, rtp) {
    const normalizedRtp =
      typeof rtp === 'number' && Number.isFinite(rtp)
        ? (rtp > 1 ? rtp / 100 : rtp)
        : DEFAULT_RTP;

    if (!Number.isInteger(safeHits) || !Number.isInteger(minesCount)) return null;
    if (minesCount < 1 || minesCount >= TOTAL_TILES) return null;
    if (safeHits < 0 || safeHits > TOTAL_TILES - minesCount) return null;

    const fairMultiplier =
      combination(TOTAL_TILES, safeHits) / combination(TOTAL_TILES - minesCount, safeHits);

    return fairMultiplier * normalizedRtp;
  }

  return {
    TOTAL_TILES,
    DEFAULT_RTP,
    sha256Hex,
    hmacSha256Hex,
    buildCounterMessage,
    getRandomStep,
    generateShuffle,
    generateTiles,
    combination,
    calcMultiplier,
  };
});
