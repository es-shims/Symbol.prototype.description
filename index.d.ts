declare function SymbolPrototypeDescription(thisArg: symbol): string | undefined;

declare namespace SymbolPrototypeDescription {
    export type Getter = (this: symbol) => string | undefined;
    export type BoundGetter = (thisArg: symbol) => string | undefined;
}

export = SymbolPrototypeDescription;