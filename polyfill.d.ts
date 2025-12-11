import implementation from './implementation';

declare function getPolyfill(): typeof implementation;

export = getPolyfill;