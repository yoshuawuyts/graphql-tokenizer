# graphql-tokenizer [![stability][0]][1]
[![npm version][2]][3] [![build status][4]][5]
[![downloads][8]][9] [![js-standard-style][10]][11]

Tokenize a graphql schema.

## Usage
```js
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
```

## API
### `token = tokenize(string)`
Tokenize a graphQL string.

## See Also
- https://github.com/facebook/graphql

## License
[MIT](https://tldrlegal.com/license/mit-license)

[0]: https://img.shields.io/badge/stability-experimental-orange.svg?style=flat-square
[1]: https://nodejs.org/api/documentation.html#documentation_stability_index
[2]: https://img.shields.io/npm/v/graphql-tokenizer.svg?style=flat-square
[3]: https://npmjs.org/package/graphql-tokenizer
[4]: https://img.shields.io/travis/yoshuawuyts/graphql-tokenizer/master.svg?style=flat-square
[5]: https://travis-ci.org/yoshuawuyts/graphql-tokenizer
[6]: https://img.shields.io/codecov/c/github/yoshuawuyts/graphql-tokenizer/master.svg?style=flat-square
[7]: https://codecov.io/github/yoshuawuyts/graphql-tokenizer
[8]: http://img.shields.io/npm/dm/graphql-tokenizer.svg?style=flat-square
[9]: https://npmjs.org/package/graphql-tokenizer
[10]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[11]: https://github.com/feross/standard
