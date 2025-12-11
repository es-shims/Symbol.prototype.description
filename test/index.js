'use strict';

var test = require('tape');

var description = require('../');
var runTests = require('./tests');

test('as a function', function (t) {
	t.test('bad array/this value', function (st) {
		// @ts-expect-error
		st['throws'](function () { description(undefined); }, TypeError, 'undefined is not an object');
		// @ts-expect-error
		st['throws'](function () { description(null); }, TypeError, 'null is not an object');
		st.end();
	});

	runTests(description, t);

	t.end();
});
