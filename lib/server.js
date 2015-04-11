'use strict';

var fs = require('fs')
var http = require('http')

var chalk = require('chalk')
var finalhandler = require('finalhandler')
var morgan = require('morgan')
var open = require('open')
var Queue = require('dong-queue')

function logError(err) {
  console.error(err.stack || err.toString())
}

module.exports = function server(options) {

  chalk.enabled = true

  var queue = new Queue()

  if (options.debug) {
    queue.use(morgan('tiny'))
  }

  queue.use(require('serve-favicon')(__dirname + '/assets/favicon.png'))

  if (options.mock && fs.existsSync(options.mock)) {
    // TODO: WATCH
    queue.use(require('serve-api')(options.mock))
  }

  queue.use([

    require('serve-static')(options.root),

    require('serve-index')(options.root, {
      'icons': true
    })

  ])

  // Create server
  var server = http.createServer(function onRequest(req, res){

    // remove query
    req.url = req.url.replace(/\?+(.+)$/, '')
    req.query = RegExp.$1

    queue.run(req, res, function() {
      finalhandler(req, res, {
        onerror: logError
      })()
    })
  })

  // Listen
  server.listen(options.port, function() {
    console.log('')
    console.log(chalk.magenta('░▒▓██ Listening root: "%s" at port: "%s" ...\n'), options.root, options.port)

    if (options.open) {
      open('http://' + options.host + ':' + options.port)
    }
  })

}
