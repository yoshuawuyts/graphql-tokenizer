var assert = require('assert')

var codes = {
  leftBrace: '{'.charCodeAt(),
  leftParen: '('.charCodeAt(),
  carriage: '\r'.charCodeAt(),
  colon: ':'.charCodeAt(),
  comment: '#'.charCodeAt(),
  comma: ','.charCodeAt(),
  newline: '\n'.charCodeAt(),
  rightParen: ')'.charCodeAt(),
  rightBrace: '}'.charCodeAt()
}

var strings = {
  float: Buffer.from('Float'),
  int: Buffer.from('Int'),
  spread: Buffer.from('...'),
  string: Buffer.from('String'),
  type: Buffer.from('type')
}

module.exports = gqlTokenizer

function gqlTokenizer (input) {
  assert.ok(Buffer.isBuffer(input), 'gql-tokenizer: input should be type Buffer')

  var current = 0
  var tokens = []
  var str = ''
  var char

  while (current < input.length) {
    char = input[current]

    if (isWhitespace(char) || char === codes.comma) {
      current++
      continue
    }

    if (char === codes.leftBrace) {
      tokens.push({ type: 'leftBrace', value: '{' })
      current++
      continue
    }

    if (char === codes.rightBrace) {
      tokens.push({ type: 'rightBrace', value: '}' })
      current++
      continue
    }

    if (char === codes.leftParen) {
      tokens.push({ type: 'leftParen', value: '(' })
      current++
      continue
    }

    if (char === codes.rightParen) {
      tokens.push({ type: 'rightParen', value: ')' })
      current++
      continue
    }

    if (char === codes.colon) {
      tokens.push({ type: 'colon', value: ':' })
      current++
      continue
    }

    // comments
    if (char === codes.comment) {
      while (char !== codes.newline && char !== codes.carriage) {
        str += String.fromCharCode(char)
        char = input[++current]
      }
      tokens.push({ type: 'comment', value: str })
      str = ''
      continue
    }

    // read keywords
    if (isCharacter(char)) {
      while (isCharacter(char)) {
        str += String.fromCharCode(char)
        char = input[++current]
      }
      if (str === strings.float) {
        tokens.push({ type: 'float', value: str })
      } else if (str === strings.int) {
        tokens.push({ type: 'int', value: str })
      } else if (str === strings.string) {
        tokens.push({ type: 'string', value: str })
      } else if (str === strings.type) {
        tokens.push({ type: 'type', value: str })
      } else {
        tokens.push({ type: 'string', value: str })
      }
      str = ''
      continue
    }

    throw new Error(String.fromCharCode(char) + ' is not a valid character. Code: ' + char)
  }

  return tokens
}

function isCharacter (char) {
  return (char >= 65 && char <= 90) || // A-Z
    char === 95 ||                     // _
    (char >= 97 && char <= 122) ||     // a-z
    char === 45 ||                     // -
    (char >= 48 && char <= 57)         // 0-9
}

function isWhitespace (b) {
  return b === 0x20 || b === 0x09 || b === 0x0A || b === 0x0C || b === 0x0D
}
