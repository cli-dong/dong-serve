/*
 * dong-serve
 * https://github.com/crossjs/dong-serve
 *
 * Copyright (c) 2015 crossjs
 * Licensed under the MIT license.
 */

'use strict';

var extend = require('extend')
var getPkg = require('package')

module.exports = function(options) {

  var pkg = getPkg('.')

  options = extend({
    root: '.',
    host: '127.0.0.1',
    port: 9527,
    mock: 'api',
    open: false,
    debug: false
  }, pkg && pkg.dong || {}, options)

  require('./lib/server')(options)

}
