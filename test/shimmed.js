'use strict';

var originalSymbol = typeof Symbol === 'function' ? Symbol : null;
require('../auto');

var hasOwn = require('hasown');
var keys = require('own-keys');
var hasSymbols = require('has-symbols')();
var test = require('tape');
var hasStrictMode = require('has-strict-mode')();
var inspect = require('object-inspect');
var isEnumerable = Object.prototype.propertyIsEnumerable;

var runTests = require('./tests');
var getInferredName = require('get-symbol-description/getInferredName');

test('shimmed', { skip: !hasSymbols && 'Symbols not supported in this environment' }, function (t) {
	t.test('enumerability', function (et) {
		et.equal(false, isEnumerable.call(Symbol.prototype, 'description'), 'Symbol.prototype.description is not enumerable');
		et.end();
	});

	t.test('getter', function (st) {
		var desc = Object.getOwnPropertyDescriptor(Symbol.prototype, 'description');
		st.ok(desc, 'has a descriptor');
		if (desc) {
			st.equal(typeof desc.get, 'function', '"get" is a function');
			if (desc.get) {
				st.equal(desc.get.length, 0, 'getter length is 0');
			}
		}

		st.end();
	});

	t.test('hasOwnProperty', function (st) {
		var ownProperties = keys(/** @type {NonNullable<typeof originalSymbol>} */ (originalSymbol));
		t.comment('expected original keys: ' + ownProperties);
		for (var i = 0; i < ownProperties.length; i++) {
			var p = ownProperties[i];
			// @ts-expect-error 'callee' is expected in some engines
			if (p !== 'length' && p !== 'arguments' && p !== 'caller' && p !== 'callee') {
				st.ok(hasOwn(Symbol, p), 'has own property: ' + inspect(p));
			}
		}
		st.end();
	});

	t.test('bad object value', { skip: !hasStrictMode }, function (st) {
		// @ts-expect-error
		st['throws'](function () { return Object.values(undefined); }, TypeError, 'undefined is not an object');
		// @ts-expect-error
		st['throws'](function () { return Object.values(null); }, TypeError, 'null is not an object');
		st.end();
	});

	t.test('only possible when shimmed (or inference is supported)', function (st) {
		st.equal(Symbol('').description, '', 'Symbol("") description is empty string');
		st.end();
	});

	t.test('ensure global Symbol is NOT shimmed', { skip: !getInferredName }, function (st) {
		st.equal(Symbol, originalSymbol, 'global Symbol is not overridden');
		st.end();
	});

	runTests(function (x) { return x.description; }, t);

	t.end();
});
