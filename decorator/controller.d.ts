import { Type } from '@fm/di';
import { Router } from 'express';
export interface ControlerInterface {
    router: Router;
}
interface ControllerDecorator {
    (baseUrl?: string): <T extends ControlerInterface>(type: Type<T>) => Type<T>;
}
export declare const Controller: ControllerDecorator;
export declare const Post: (this: unknown, ...args: any[]) => any;
export declare const Get: (this: unknown, ...args: any[]) => any;
export declare const Delete: (this: unknown, ...args: any[]) => any;
export declare const Put: (this: unknown, ...args: any[]) => any;
export declare const All: (this: unknown, ...args: any[]) => any;
export declare const Param: (this: unknown, ...args: any[]) => any;
export declare const Use: (this: unknown, ...args: any[]) => any;
export declare const Options: (this: unknown, ...args: any[]) => any;
export {};
