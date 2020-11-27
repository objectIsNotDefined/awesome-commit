const logSymbols = require('log-symbols')
const chalk = require('chalk')
const log = console.log

let handle = (type, msg) => {
  if (type == 'success') log(logSymbols.success, chalk.green(msg))
  if (type == 'error') log(logSymbols.error, chalk.red(msg))
}

module.exports = handle