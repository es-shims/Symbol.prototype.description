# Symbol.prototype.description <sup>[![Version Badge][npm-version-svg]][package-url]</sup>

[![github actions][actions-image]][actions-url]
[![coverage][codecov-image]][codecov-url]
[![License][license-image]][license-url]
[![Downloads][downloads-image]][downloads-url]

[![npm badge][npm-badge-png]][package-url]

An ECMAScript spec-compliant `Symbol.prototype.description` shim. Invoke its "shim" method to shim Symbol.prototype.description if it is unavailable.
*Note*: `Symbol#description` requires a true ES6 environment, specifically one with native Symbols (eg, node >= v11.15.0)

This package implements the [es-shim API](https://github.com/es-shims/api) interface. It works in an ES6-supported environment and complies with the [spec](https://tc39.es/ecma262/#sec-symbol.prototype.description).

Most common usage:
```js
var description = require('symbol.prototype.description');
var assert = require('assert');

assert(description(Symbol('foo')) === 'foo');
assert(description(Symbol()) === undefined);
assert(description(Symbol(undefined)) === undefined);
assert(description(Symbol(null)) === 'null');

if (!('description' in Symbol.prototype)) {
	// note: this should be the empty string, but in many engines,
	// it is impossible to distinguish Symbol() and Symbol('')
	// without globally replacing `Symbol`
	assert(description(Symbol('')) === undefined);

	description.shim();
}

assert(description(Symbol('foo')) === Symbol('foo').description);
assert(description(Symbol()) === Symbol().description);
assert(description(Symbol(undefined)) === Symbol(undefined).description);
assert(description(Symbol(null)) === Symbol(null).description);

assert(Symbol('').description === ''); // this works fine!
```

## Tests
Simply clone the repo, `npm install`, and run `npm test`

[package-url]: https://npmjs.com/package/symbol.prototype.description
[npm-version-svg]: https://versionbadg.es/es-shims/Symbol.prototype.description.svg
[deps-svg]: https://david-dm.org/es-shims/Symbol.prototype.description.svg
[deps-url]: https://david-dm.org/es-shims/Symbol.prototype.description
[dev-deps-svg]: https://david-dm.org/es-shims/Symbol.prototype.description/dev-status.svg
[dev-deps-url]: https://david-dm.org/es-shims/Symbol.prototype.description#info=devDependencies
[npm-badge-png]: https://nodei.co/npm/symbol.prototype.description.png?downloads=true&stars=true
[license-image]: https://img.shields.io/npm/l/symbol.prototype.description.svg
[license-url]: LICENSE
[downloads-image]: https://img.shields.io/npm/dm/symbol.prototype.description.svg
[downloads-url]: https://npm-stat.com/charts.html?package=symbol.prototype.description
[codecov-image]: https://codecov.io/gh/es-shims/Symbol.prototype.description/branch/main/graphs/badge.svg
[codecov-url]: https://app.codecov.io/gh/es-shims/Symbol.prototype.description/
[actions-image]: https://img.shields.io/endpoint?url=https://github-actions-badge-u3jn4tfpocch.runkit.sh/es-shims/Symbol.prototype.description
[actions-url]: https://github.com/es-shims/Symbol.prototype.description/actions
