var config = require('../webpack.config')
var webpack = require('webpack')
var WebpackDevServer = require('webpack-dev-server')
var opn = require('opn')
var execSync = require('child_process').execSync

var PORT = 8080

function clearConsole() {
    process.stdout.write('\x1bc')
}

function openBrowser(port) {
    // try {
    //     if (process.platform === 'darwin') {
    //         execSync('ps cax | grep "Google Chrome"')
    //         execSync(
    //             'osascript ' +
    //             path.resolve(__dirname, './chrome.applescript') +
    //             ' http://localhost:' + port + '/'
    //         )
    //         return
    //     }
    // } catch (err) {
        opn('http://localhost:' + port + '/')
    // }
}

var compiler = webpack(config)

function runDevServer(port) {
    new WebpackDevServer(compiler, {
        historyApiFallback: true,
        hot: true,
        colors: true,
        watchOptions: {
            ignored: /node_modules/
        }
    }).listen(port, function(err, result) {
        if (err) {
            return console.log(err)
        }

        clearConsole()
        openBrowser(port)
    })
}

runDevServer(PORT)