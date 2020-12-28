const chalk = require('chalk')
const recast = require('recast')
const acorn = require('acorn')
const jsx = require('acorn-jsx')

const acornParser = acorn.Parser.extend(jsx())

const spreadCode = `
const a = { foo: 'bar' }
const b = { baz: 'qux' }
const merged = { ...a, ...b }
`

const jsxCode = 'const div = <div>hello</div>'

function tryParse (name, code) {
  acornParser.parse(code)
  console.log(chalk.blue(`Acorn parsed the ${name} code`))
  try {
    recast.parse(code, {
      parser: {
        parse (codeString) {
          const ast = acornParser.parse(codeString)
          return ast
        }
      }
    })
    console.log(chalk.blue(`Deep setup worked for the ${name} code`))
  } catch (e) {
    console.log(chalk.red(`Deep setup failed for the ${name} code`))
    console.log(e)
  }
  try {
    recast.parse(code, { parser: acornParser })
    console.log(chalk.blue(`Simple setup worked for ${name} code`))
  } catch (e) {
    console.log(chalk.red(`Simple setup failed for the ${name} code`))
    console.log(e)
  }
}

tryParse('spread', spreadCode)
tryParse('jsx', jsxCode)
