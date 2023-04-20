import { Type } from '@fm/di';
interface ControllerDecorator {
    (baseUrl?: string): <T>(type: Type<T>) => Type<T>;
}
export declare const Controller: ControllerDecorator;
export declare const Get: (this: unknown, ...args: any[]) => any, All: (this: unknown, ...args: any[]) => any, Use: (this: unknown, ...args: any[]) => any, Put: (this: unknown, ...args: any[]) => any, Post: (this: unknown, ...args: any[]) => any, Param: (this: unknown, ...args: any[]) => any, Delete: (this: unknown, ...args: any[]) => any, Options: (this: unknown, ...args: any[]) => any, Middleware: (this: unknown, ...args: any[]) => any;
export {};
