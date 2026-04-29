# Keno Auto Verify Implementation Plan 

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Remove the manual `Verify Result` button from the Keno verifier page while preserving the existing automatic verification behavior.

**Architecture:** Use one small static regression test to lock the expected DOM and boot sequence. Then make the minimal HTML cleanup in `keno/index.html`, leaving the verifier logic and query-driven auto-submit flow untouched.

**Tech Stack:** Static HTML, vanilla JavaScript, Node test runner

---

### Task 1: Lock the desired Keno verifier behavior

**Files:**
- Create: `tests/keno-auto-verify.test.js`
- Test: `keno/index.html`
- Test: `keno/script.js`

**Step 1: Write the failing test**

Add a source-level test that asserts:
- `keno/index.html` does not render `#verifyButton`
- `keno/script.js` still bootstraps with `applyInitialValues(); handleSubmit();`
- `keno/script.js` still auto-verifies on input changes

**Step 2: Run test to verify it fails**

Run: `node --test tests/keno-auto-verify.test.js`
Expected: FAIL because the button still exists in `keno/index.html`.

### Task 2: Remove the redundant manual button

**Files:**
- Modify: `keno/index.html`

**Step 3: Write minimal implementation**

Remove the `Verify Result` button from the Keno form and keep the copy button plus the existing auto-verify boot sequence untouched.

**Step 4: Run test to verify it passes**

Run: `node --test tests/keno-auto-verify.test.js`
Expected: PASS

### Task 3: Verify and publish

**Files:**
- Commit: `keno/index.html`
- Commit: `tests/keno-auto-verify.test.js`
- Commit: `docs/plans/2026-04-21-keno-auto-verify-design.md`
- Commit: `docs/plans/2026-04-21-keno-auto-verify-implementation.md`

**Step 5: Run targeted verification**

Run:
- `node --test tests/keno-auto-verify.test.js`
- `node --test tests/keno-verifier-core.test.js`

Expected: PASS
