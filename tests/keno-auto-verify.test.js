const test = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')

const indexHtml = fs.readFileSync(path.resolve(__dirname, '../keno/index.html'), 'utf8')
const scriptSource = fs.readFileSync(path.resolve(__dirname, '../keno/script.js'), 'utf8')

test('keno page removes the manual Verify Result button', () => {
  assert.doesNotMatch(
    indexHtml,
    /id="verifyButton"/,
    'The Keno verifier should no longer render a manual Verify Result button',
  )
})

test('keno page still auto-verifies when it boots', () => {
  assert.match(
    scriptSource,
    /applyInitialValues\(\)\s*\n\s*handleSubmit\(\)/,
    'The Keno verifier should still auto-submit once after initial values are applied',
  )
})

test('keno page still auto-verifies when inputs change', () => {
  assert.match(
    scriptSource,
    /element\.addEventListener\('input', scheduleAutoVerify\)[\s\S]*element\.addEventListener\('change', scheduleAutoVerify\)/,
    'The Keno verifier should keep automatic re-verification on input changes',
  )
})
