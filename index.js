var assert = require('assert')

var codes = {
  bom: '\uFEFF',
  carriage: '\r'.charCodeAt(),
  colon: ':'.charCodeAt(),
  comma: ','.charCodeAt(),
  comment: '#'.charCodeAt(),
  leftBrace: '{'.charCodeAt(),
  leftParen: '('.charCodeAt(),
  newline: '\n'.charCodeAt(),
  rightBrace: '}'.charCodeAt(),
  rightParen: ')'.charCodeAt(),
  zero: '0'.charCodeAt()
}

var strings = {
  float: 'Float',
  int: 'Int',
  spread: '...',
  string: 'String',
  type: 'type'
}

module.exports = graphqlTokenizer

function graphqlTokenizer (input) {
  assert.ok(Buffer.isBuffer(input), 'graphql-tokenizer: input should be type Buffer')

  var current = 0
  var tokens = []
  var str = ''
  var char

  while (current < input.length) {
    char = input[current]

    if (isWhitespace(char) || char === codes.comma || char === codes.bom) {
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
    if (isString(char)) {
      while (isCharacter(char)) {
        str += String.fromCharCode(char)
        char = input[++current]
      }
      if (str === strings.float) {
        tokens.push({ type: 'Name', id: 'float', value: str })
      } else if (str === strings.int) {
        tokens.push({ type: 'Name', id: 'int', value: str })
      } else if (str === strings.type) {
        tokens.push({ type: 'Name', id: 'type', value: str })
      } else if (str === strings.id) {
        tokens.push({ type: 'Name', id: 'type', value: str })
      } else {
        tokens.push({ type: 'Name', id: 'string', value: str })
      }
      str = ''
      continue
    }

    if (isNumber(char)) {
      while (isNumber(char)) {
        if (str === '0') throw new Error('Invalid number, unexpected digit after 0')
        str += String.fromCharCode(char)
        char = input[++current]
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

function isNumber (char) {
  return char >= 48 && char <= 57      // 0-9
}

function isString (char) {
  return (char >= 65 && char <= 90) || // A-Z
    (char >= 97 && char <= 122)        // a-z
}

function isWhitespace (b) {
  return b === 0x20 || b === 0x09 || b === 0x0A || b === 0x0C || b === 0x0D
}
