// Since postinstall will also run when you run npm install
// locally we make sure it only runs in production

var childProcess = require('child_process')

if (process.env.NODE_ENV === 'production') {
  childProcess.exec('webpack -p --config webpack.production.config.js', function (error, stdout, stderr) {
    console.log('stdout: ' + stdout)
    console.log('stderr: ' + stderr)
    if (error !== null) {
      console.log('exec error: ' + error)
    }
  })
} else {
  childProcess.exec('webpack -p', function (error, stdout, stderr) {
    console.log('stdout: ' + stdout)
    console.log('stderr: ' + stderr)
    if (error !== null) {
      console.log('exec error: ' + error)
    }
  })
}
