# Keno Auto Verify Design

**Goal:** Remove the `Verify Result` button from the Keno verifier page and keep the current automatic verification behavior intact.

**Chosen Approach:** Keep the existing page lifecycle exactly as-is. The page already auto-populates URL parameters and calls `handleSubmit()` on load, and it already re-verifies on input changes. Only the unnecessary manual `Verify Result` button will be removed from the Keno page markup.

**Why This Approach:**
- The current Keno verifier already auto-verifies on load.
- No algorithm or validation behavior needs to change.
- Keeps the change scoped to the Keno page only.

**Behavior Rules:**
- Loading `/keno?...` with valid params still verifies automatically.
- Editing any input still triggers automatic re-verification.
- `Copy Verification Steps` stays available after a successful verification.
- Other verifier pages remain unchanged.

**Guardrails:**
- Do not modify `lib/keno-verifier-core.js`.
- Do not change `dice.html`, `mines.html`, or `plinko.html`.
- Avoid reworking validation or visual layout beyond the removed button.

**Verification:**
- Add a static-source regression test that locks the absence of the `Verify Result` button and the continued presence of auto-verify wiring.
- Run targeted node tests only.
