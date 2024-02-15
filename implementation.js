'use strict';

var $TypeError = require('es-errors/type');
var getSymbolDescription = require('get-symbol-description');

module.exports = function description() {
	if (this == null) { // eslint-disable-line eqeqeq
		throw new $TypeError('`this` value must be object-coercible');
	}

	return getSymbolDescription(this);
};
