const { parse } = require('recast')
const acorn = require('acorn')

const code = `
const a = { foo: 'bar' }
const b = { baz: 'qux' }

const merged = { ...a, ...b }
`

acorn.parse(code)
console.log('Acorn parsed the code')
parse(code, { parser: acorn })
