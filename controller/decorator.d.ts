import { Type } from '@fm/di';
import { hookFunc } from './context';
import { ModelOptions } from './manager';
import { ControllerOptions } from './router-manager';
interface TypeDecorator {
    <T>(type: Type<T>): any;
}
interface ControllerDecorator {
    (baseUrl?: string | ControllerOptions, options?: ControllerOptions): TypeDecorator;
}
export declare const Controller: ControllerDecorator;
interface ModelDecorator {
    (options: ModelOptions): TypeDecorator;
}
export declare const ControllerModel: ModelDecorator;
export declare const Get: (this: unknown, ...args: any[]) => any;
export declare const All: (this: unknown, ...args: any[]) => any;
export declare const Use: (this: unknown, ...args: any[]) => any;
export declare const Put: (this: unknown, ...args: any[]) => any;
export declare const Post: (this: unknown, ...args: any[]) => any;
export declare const Param: (this: unknown, ...args: any[]) => any;
export declare const Delete: (this: unknown, ...args: any[]) => any;
export declare const Options: (this: unknown, ...args: any[]) => any;
export declare const Middleware: (this: unknown, ...args: any[]) => any;
export declare const Ip: (this: unknown, ...args: any[]) => any;
export declare const Req: (this: unknown, ...args: any[]) => any;
export declare const Res: (this: unknown, ...args: any[]) => any;
export declare const Next: (this: unknown, ...args: any[]) => any;
export declare const Body: (this: unknown, ...args: any[]) => any;
export declare const Query: (this: unknown, ...args: any[]) => any;
export declare const Params: (this: unknown, ...args: any[]) => any;
export declare const Headers: (this: unknown, ...args: any[]) => any;
export declare function CustomParams(transform: hookFunc): (this: unknown, ...args: any[]) => any;
export {};
