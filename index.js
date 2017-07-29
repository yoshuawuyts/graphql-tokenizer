var assert = require('assert')

var NEWLINE = /[\r\n]{1,2}/

var codes = {
  comment: '#'.charCodeAt(),
  newline: '\n'.charCodeAt(),
  carriage: '\r'.charCodeAt()
}

module.exports = gqlTokenizer

function gqlTokenizer (input) {
  assert.ok(Buffer.isBuffer(input), 'gql-tokenizer: input should be type Buffer')

  var current = 0
  var tokens = []
  var buf = ''
  var char

  while (current < input.length) {
    char = input[current]

    if (char === codes.comment) {
      while (char !== codes.newline && char !== codes.carriage) {
        buf += String.fromCharCode(char)
        char = input[++current]
      }
      tokens.push({ type: 'comment', value: buf })
      buf = ''
      continue
    }
    current++
  }

  return tokens
}
