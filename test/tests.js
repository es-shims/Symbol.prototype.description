'use strict';

var hasSymbols = require('has-symbols')();
var getInferredName = require('get-symbol-description/getInferredName');

/**
 * @param {import('..').BoundGetter} description
 * @param {import('tape').Test} t
 */
module.exports = function (description, t) {
	t.test('Symbols not supported', { skip: hasSymbols }, function (st) {
		st['throws'](
			// @ts-expect-error
			function () { description('foo'); },
			SyntaxError,
			'throws when Symbols not supported'
		);

		st.end();
	});

	t.test('Symbol description', { skip: !hasSymbols }, function (st) {
		st.equal(description(Symbol()), undefined, 'Symbol() description is undefined');
		st.equal(description(Symbol(undefined)), undefined, 'Symbol(undefined) description is undefined');
		// @ts-expect-error TS Symbol() types are overly restrictive
		st.equal(description(Symbol(null)), 'null', 'Symbol(null) description is string null');
		// @ts-expect-error TS Symbol() types are overly restrictive
		st.equal(description(Symbol(false)), 'false', 'Symbol(false) description is string false');
		// @ts-expect-error TS Symbol() types are overly restrictive
		st.equal(description(Symbol(true)), 'true', 'Symbol(true) description is string true');
		st.equal(description(Symbol('foo')), 'foo', 'Symbol("foo") description is string foo');

		st.end();
	});

	t.test('only possible when inference is supported', { skip: !getInferredName }, function (st) {
		st.equal(description(Symbol('')), '', 'Symbol("") description is empty string');
		st.end();
	});
};
