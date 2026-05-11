const test = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')

const scriptSource = fs.readFileSync(path.resolve(__dirname, '../penalty-shootout/script.js'), 'utf8')
const stylesSource = fs.readFileSync(path.resolve(__dirname, '../penalty-shootout/styles.css'), 'utf8')

test('penalty shootout defaults missing round index query param to zero', () => {
  assert.match(
    scriptSource,
    /params\.get\("round"\)\s*\)\s*\|\|\s*"0"/,
    'Missing round_index query params should initialize Round Index as 0',
  )

  assert.match(
    scriptSource,
    /elements\.roundIndexInput\.value = hasQueryOverrides \? queryState\.roundIndex : GAME_CONFIG\.demo\.roundIndex;/,
    'Query-driven initial values should use the parsed Round Index value',
  )
})

test('penalty shootout keeps mobile layout from overflowing narrow screens', () => {
  assert.match(stylesSource, /@media \(max-width: 640px\)/)
  assert.match(stylesSource, /\.hero-copy, \.hero-note \{ min-width: 0; \}/)
  assert.match(stylesSource, /\.hero-copy h1 \{[^}]*overflow-wrap: anywhere;/)
  assert.match(stylesSource, /\.hero-copy p, \.hero-note strong, \.hero-note p, \.hero-copy code, \.hero-note code \{[^}]*overflow-wrap: anywhere;/)
  assert.match(stylesSource, /\.hero-copy h1 \{ font-size: clamp\(1\.55rem, 8vw, 2rem\); line-height: 1\.12; \}/)
  assert.match(stylesSource, /\.status-pill \{ width: 100%; text-align: center; \}/)
  assert.match(stylesSource, /\.chip-row \{ align-items: stretch; flex-direction: column; \}/)
  assert.match(stylesSource, /\.chip \{ width: 100%; \}/)
})
