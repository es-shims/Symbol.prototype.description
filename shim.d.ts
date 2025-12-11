import implementation from './implementation';

declare function shim(): false | typeof implementation;

export = shim;