'use strict';

var hasSymbols = require('has-symbols')();

var implementation = require('./implementation');
var gOPD = require('gopd');

module.exports = function descriptionPolyfill() {
	if (!hasSymbols || typeof gOPD !== 'function') {
		return implementation;
	}

	var desc = gOPD(Symbol.prototype, 'description');
	if (!desc || typeof desc.get !== 'function') {
		return implementation;
	}

	var emptySymbolDesc = desc.get.call(Symbol());
	var emptyDescValid = typeof emptySymbolDesc === 'undefined' || emptySymbolDesc === '';
	if (!emptyDescValid || desc.get.call(Symbol('a')) !== 'a') {
		return implementation;
	}
	return desc.get;
};
