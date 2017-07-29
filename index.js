var assert = require('assert')

var NEWLINE = /[\r\n]{1,2}/

module.exports = gqlTokenizer

function gqlTokenizer (input) {
  assert.equal(typeof input, 'string', 'gql-tokenizer: input should be type string')

  var current = 0
  var tokens = []
  var buf = ''
  var char

  while (current < input.length) {
    char = input[current]

    if (char === '#') {
      char = input[++current]
      while (!NEWLINE.test(char)) {
        buf += char
        char = input[++current]
      }
      tokens.push({ type: 'comment', value: buf.trim() })
      buf = ''
      continue
    }
    current++
  }

  return tokens
}
