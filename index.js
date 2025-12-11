'use strict';

var callBind = require('call-bind');

var getPolyfill = require('./polyfill');

module.exports = callBind(getPolyfill());
