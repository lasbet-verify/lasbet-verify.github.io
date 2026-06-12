# Wheel Verifier Implementation Plan

**Goal:** Add a Lasbet Wheel verification page that matches the provided demo style and copy direction while reusing the existing Double verifier random-number algorithm.

**Baseline:**
- Branch: `main`
- Working tree before changes: clean
- Required workflow dependency `packages/core/rulesets/common/fe/delivery-gates/RULESET.md` is not present in this repository.

**Scope:**
- Add `wheel.html`.
- Add `wheel/styles.css`, `wheel/script.js`, and `wheel/verifier-core.js`.
- Add focused Node tests for the Wheel core and page bootstrap behavior.
- Preserve existing verifier pages.

**Algorithm Decision:**
- Wheel reuses the Double verifier random-number algorithm:
  - `commitment = SHA-256(server_seed)`
  - `H = HMAC_SHA256(server_seed, String(nonce))`
  - `x = int(H[0:13], 16)`
  - `r = x / 2^52`
- Wheel then follows the service verification instruction:
  - `result_scale = 25`
  - `bucket = floor(r * result_scale)`
  - Map buckets by configured weights in this order: `GREEN=10`, `YELLOW=8`, `PINK=4`, `BLUE=2`, `RED=1`
  - `bucket 0-9 => Green`, 10 slots, 40%, `2.4x`, 96% RTP
  - `bucket 10-17 => Yellow`, 8 slots, 32%, `3x`, 96% RTP
  - `bucket 18-21 => Pink`, 4 slots, 16%, `6x`, 96% RTP
  - `bucket 22-23 => Blue`, 2 slots, 8%, `12x`, 96% RTP
  - `bucket 24 => Red`, 1 slot, 4%, `24x`, 96% RTP
- The page also accepts optional service-side verification URL fields (`result_color`, `bet_area`, `theoretical_payout_amount`, `actual_payout_amount`, `max_payout_cap_amount`, `max_payout_hit_reason`) and displays them for manual comparison when present.

**Design Decision:**
- Use the provided demo's warm verifier layout and bilingual copy structure.
- Keep Wheel naming in page title and hero copy.
- Display the Wheel color result, slot count, probability, odds, and RTP so the formula text matches actual behavior.

**Tasks:**
1. Add tests that assert Wheel core output matches Double core for the same seed/nonce up through `r`, then applies the Wheel color table.
2. Add tests that assert the Wheel page does not load demo values by default and only auto-verifies when URL parameters are present.
3. Implement Wheel static files using existing verifier page patterns.
4. Run targeted Node tests and a browser smoke check for `wheel.html`.

**Verification:**
- `node --test tests/wheel-verifier-core.test.js tests/wheel-page-init.test.js`
- Existing targeted Double tests:
  - `node --test tests/double-verifier-core.test.js tests/double-page-init.test.js`
- Browser smoke check:
  - Load `wheel.html?s=...&n=42`
  - Confirm the page renders the expected result and copy button state.
