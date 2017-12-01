'use strict';

var getInferredName;
try {
	// eslint-disable-next-line no-new-func
	getInferredName = Function('s', 'return { [s]() {} }[s].name;');
} catch (e) {}

module.exports = getInferredName && getInferredName.name === 'getInferredName' ? getInferredName : null;

