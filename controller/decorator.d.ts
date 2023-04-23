import { Type } from '@fm/di';
import { RouterOptions } from 'express';
import { hookFunc } from './context';
type TypeDecorator = <T>(type: Type<T>) => Type<T>;
interface ControllerDecorator {
    (baseUrl?: string | RouterOptions, options?: RouterOptions): TypeDecorator;
}
export declare const Controller: ControllerDecorator;
export declare const Get: (this: unknown, ...args: any[]) => any;
export declare const All: (this: unknown, ...args: any[]) => any;
export declare const Use: (this: unknown, ...args: any[]) => any;
export declare const Put: (this: unknown, ...args: any[]) => any;
export declare const Post: (this: unknown, ...args: any[]) => any;
export declare const Param: (this: unknown, ...args: any[]) => any;
export declare const Delete: (this: unknown, ...args: any[]) => any;
export declare const Options: (this: unknown, ...args: any[]) => any;
export declare const Middleware: (this: unknown, ...args: any[]) => any;
export declare const Req: (this: unknown, ...args: any[]) => any;
export declare const Res: (this: unknown, ...args: any[]) => any;
export declare const Next: (this: unknown, ...args: any[]) => any;
export declare function CustomParams(hook: hookFunc): (this: unknown, ...args: any[]) => any;
export {};
