/*
 * dong-serve
 * https://github.com/crossjs/dong-serve
 *
 * Copyright (c) 2015 crossjs
 * Licensed under the MIT license.
 */

'use strict';

module.exports = {
  command: 'serve',
  description: '启动 web 服务',
  options: [{
    name: 'root',
    alias: 'r',
    description: 'web root',
    defaults: '.'
  }, {
    name: 'host',
    alias: 'H',
    description: 'ip address or domain name',
    defaults: '127.0.0.1'
  }, {
    name: 'port',
    alias: 'p',
    description: 'listening port',
    defaults: 9527
  }, {
    name: 'mock',
    alias: 'm',
    description: 'mocking data directory',
    defaults: 'api'
  }, {
    name: 'open',
    alias: 'o',
    description: 'automatically open in browser',
    defaults: false
  }, {
    name: 'debug',
    alias: 'd',
    description: 'show more debug message',
    defaults: false
  }],
  bootstrap: require('./lib/serve')
}
