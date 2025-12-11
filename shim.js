'use strict';

var hasSymbols = require('has-symbols')();
var getInferredName = require('get-symbol-description/getInferredName');

var polyfill = require('./polyfill');

var $Object = require('es-object-atoms');
var gOPD = require('gopd');
var callBind = require('call-bind');
var gOPDs = require('object.getownpropertydescriptors/polyfill')();
var dP = $Object.defineProperty;
var dPs = $Object.defineProperties;
var setProto = $Object.setPrototypeOf;

/** @typedef {import('.').Getter} Getter */
/** @typedef {import('.')} BoundGetter */

/** @param {Getter} getter */
var define = function defineGetter(getter) {
	dP(Symbol.prototype, 'description', {
		configurable: true,
		enumerable: false,
		get: getter
	});
};

/** @param {Getter} getter */
var shimGlobal = function shimGlobalSymbol(getter) {
	var origSym = callBind.apply(Symbol);
	var emptyStrings = $Object.create ? $Object.create(null) : {};
	var SymNew = /** @type {(this: symbol, description?: string) => symbol} */ function Symbol() {
		var sym = origSym(this, /** @type {Parameters<typeof Symbol>} */ (/** @type {unknown} */ (arguments)));
		if (arguments.length > 0 && arguments[0] === '') {
			emptyStrings[sym] = true;
		}
		return sym;
	};
	SymNew.prototype = Symbol.prototype;
	setProto(SymNew, Symbol);
	var props = gOPDs(Symbol);
	delete props.length;
	delete props.arguments;
	delete props.caller;
	dPs(SymNew, props);
	// @ts-expect-error properties are copied above
	Symbol = SymNew; // eslint-disable-line no-native-reassign, no-global-assign, no-implicit-globals

	/** @type {BoundGetter} */
	var boundGetter = callBind(getter);
	/** @type {Getter} */
	var wrappedGetter = function description() {
		/* eslint no-invalid-this: 0 */
		var symbolDescription = boundGetter(this);
		if (emptyStrings[this]) {
			return '';
		}
		return symbolDescription;
	};
	define(wrappedGetter);
	return wrappedGetter;
};

/** @type {import('./shim')} */
module.exports = function shimSymbolDescription() {
	if (!hasSymbols || !gOPD) {
		return false;
	}
	var desc = gOPD(Symbol.prototype, 'description');
	var getter = polyfill();
	var isMissing = !desc || typeof desc.get !== 'function';
	var isBroken = !isMissing && (typeof Symbol().description !== 'undefined' || Symbol('').description !== '');
	if (isMissing || isBroken) {
		if (!getInferredName) {
			return shimGlobal(getter);
		}
		define(getter);
	}
	return getter;
};
