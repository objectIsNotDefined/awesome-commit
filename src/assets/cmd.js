const exec = require("child_process").exec
const log = require('./log')

const cmd = async (cmd) => {
  return new Promise(resolve => {
    try {
      exec(cmd, (err, stdout, stderr) => {
        if (err) {
          resolve(false)
          log('error', stderr||stdout)
        }
        resolve(true)
      })
    } catch(e) {
      resolve(false)
      log('error', 'Unknown Error')
    }
  })
}

module.exports = cmd