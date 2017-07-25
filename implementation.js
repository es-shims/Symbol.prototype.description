'use strict';

var hasSymbols = require('has-symbols')();
var symToStr = hasSymbols ? Function.call.bind(Symbol.prototype.toString) : null;

module.exports = function description() {
	var str = symToStr(this); // will throw if not a Symbol
	var desc = str.slice(7, -1); // str.slice('Symbol('.length, -')'.length);
	if (desc) {
		return desc;
	}
};
