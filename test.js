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
    { type: 'comment', value: '# Fetch the film by id' }
  ])
  assert.end()
})
