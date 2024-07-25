import { Type } from '@hwy-fm/di';
import type { FactoryEmbedded, MiddlewareType } from './router-manager';
type EmbeddedType<T extends any[]> = FactoryEmbedded<T, string> | Type<MiddlewareType<T, string>>;
export declare class Embedded<T extends any[]> {
    readonly embedded: EmbeddedType<T>;
    readonly args: T;
    constructor(embedded: EmbeddedType<T>, args: T);
}
export declare const embedded: <T extends any[]>(...params: [...T, EmbeddedType<T>]) => Embedded<T>;
export {};
