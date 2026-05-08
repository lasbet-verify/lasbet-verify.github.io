const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const vm = require('node:vm')

const cryptoSource = fs.readFileSync(
  path.resolve(__dirname, '../lib/crypto-js.js'),
  'utf8',
)
const source = fs.readFileSync(
  path.resolve(__dirname, '../lib/crash-verifier-core.js'),
  'utf8',
)

const context = {
  module: { exports: {} },
  exports: {},
  window: {},
}

vm.createContext(context)
vm.runInContext(cryptoSource, context)
context.CryptoJS = context.module.exports
vm.runInContext(source, context)

const result = context.window.CrashVerifierCore.computeCrash(
  'b8f4a6c1f9d3e7ab91c4275e8f0d1c3bb8f4a6c1f9d3e7ab91c4275e8f0d1c3b',
  '4290',
)

assert.equal(result.inputString, 'b8f4a6c1f9d3e7ab91c4275e8f0d1c3bb8f4a6c1f9d3e7ab91c4275e8f0d1c3b:4290')
assert.equal(result.roundHash, '81767f42ea1132a4a98f5f205dcaa18bcc58298c3986477d936e480d91b7754f')
assert.equal(result.first52BitsHex, '81767f42ea113')
assert.equal(result.first52BitsInt, 2277535059452179)
assert.equal(result.first52BitsFormatted, '2,277,535,059,452,179')
assert.equal(result.ratioDisplay, '0.505714372479')
assert.equal(result.rawMultiplierDisplay, '2.002890524989x')
assert.equal(result.finalMultiplierDisplay, '2.00x')

console.log('Crash verifier core checks passed')
