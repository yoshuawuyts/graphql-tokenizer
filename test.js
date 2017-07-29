var spok = require('spok')
var tape = require('tape')
var tokenize = require('./')

tape('tokenizes a graphql string', function (assert) {
  var schema = `
    type Film {
      title: String
    }

    type Query {
      # Fetch the film by id
      film(id: Int): Film
    }
  `

  var res = tokenize(Buffer.from(schema))
  console.log(res)
  spok(assert, res, [
    { type: 'Name', id: 'type', value: 'type' },
    { type: 'Name', id: 'string', value: 'Film' },
    { type: 'leftBrace', value: '{' },
    { type: 'Name', id: 'string', value: 'title' },
    { type: 'colon', value: ':' },
    { type: 'Name', id: 'string', value: 'String' },
    { type: 'rightBrace', value: '}' },
    { type: 'Name', id: 'type', value: 'type' },
    { type: 'Name', id: 'string', value: 'Query' },
    { type: 'leftBrace', value: '{' },
    { type: 'comment', value: '# Fetch the film by id' },
    { type: 'Name', id: 'string', value: 'film' },
    { type: 'leftParen', value: '(' },
    { type: 'Name', id: 'string', value: 'id' },
    { type: 'colon', value: ':' },
    { type: 'Name', id: 'int', value: 'Int' },
    { type: 'rightParen', value: ')' },
    { type: 'colon', value: ':' },
    { type: 'Name', id: 'string', value: 'Film' },
    { type: 'rightBrace', value: '}' }
  ])
  assert.end()
})
