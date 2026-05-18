const test = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')

const scriptSource = fs.readFileSync(path.resolve(__dirname, '../double/script.js'), 'utf8')

test('double page does not fill demo values when URL params are absent', () => {
  assert.doesNotMatch(
    scriptSource,
    /GAME_CONFIG\.demo/,
    'The Double verifier should not fall back to demo values when URL params are absent',
  )
})

test('double page only auto-verifies when URL params are applied', () => {
  assert.match(
    scriptSource,
    /if \(applyInitialValues\(\)\) \{\s*\n\s*handleSubmit\(\);\s*\n\s*\}/,
    'The Double verifier should keep empty inputs idle when no URL params are present',
  )
})
