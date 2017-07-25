'use strict';

var polyfill = require('./polyfill');

module.exports = Function.call.bind(polyfill());
