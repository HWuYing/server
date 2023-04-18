import { Type } from '@fm/di';
import { Router } from 'express';
export interface ControllerInterface {
    router: Router;
}
interface ControllerDecorator {
    (baseUrl?: string): <T extends ControllerInterface>(type: Type<T>) => Type<T>;
}
export declare const Controller: ControllerDecorator;
export declare const Middleware: (this: unknown, ...args: any[]) => any;
export declare const Get: (this: unknown, ...args: any[]) => any, FactoryGet: any, All: (this: unknown, ...args: any[]) => any, FactoryAll: any, Use: (this: unknown, ...args: any[]) => any, FactoryUse: any, Put: (this: unknown, ...args: any[]) => any, FactoryPut: any, Post: (this: unknown, ...args: any[]) => any, FactoryPost: any, Param: (this: unknown, ...args: any[]) => any, FactoryParam: any, Delete: (this: unknown, ...args: any[]) => any, FactoryDelete: any, Options: (this: unknown, ...args: any[]) => any, FactoryOptions: any;
export {};
