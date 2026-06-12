const test = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')

const htmlSource = fs.readFileSync(path.resolve(__dirname, '../wheel.html'), 'utf8')
const scriptSource = fs.readFileSync(path.resolve(__dirname, '../wheel/script.js'), 'utf8')

test('wheel page uses the Wheel verifier assets', () => {
  assert.match(htmlSource, /<link rel="stylesheet" href="\.\/wheel\/styles\.css" \/>/)
  assert.match(htmlSource, /<script src="\.\/wheel\/verifier-core\.js"><\/script>/)
  assert.match(htmlSource, /<script src="\.\/wheel\/script\.js"><\/script>/)
})

test('wheel page does not fill demo values when URL params are absent', () => {
  assert.doesNotMatch(
    scriptSource,
    /GAME_CONFIG\.demo/,
    'The Wheel verifier should not fall back to demo values when URL params are absent',
  )
})

test('wheel page only auto-verifies when URL params are applied', () => {
  assert.match(
    scriptSource,
    /if \(applyInitialValues\(\)\) \{\s*\n\s*handleSubmit\(\);\s*\n\s*\}/,
    'The Wheel verifier should keep empty inputs idle when no URL params are present',
  )
})

test('wheel page describes the service-side bucket mapping and payout comparison fields', () => {
  assert.match(scriptSource, /bucket = floor\(r \* result_scale\)/)
  assert.match(scriptSource, /bucket 0-9 => Green \| weight 10/)
  assert.match(scriptSource, /bucket 24 => Red \| weight 1/)
  assert.match(scriptSource, /Compare theoretical payout, actual payout, and Max Payout cap fields/)
  assert.match(scriptSource, /resultColor/)
  assert.match(scriptSource, /theoreticalPayoutAmount/)
  assert.doesNotMatch(scriptSource, /else if r < 0\.72/)
})
