/// <reference types="qs" />
import { Type } from '@fm/di';
import { RequestHandler } from 'express';
import { hookFunc } from './context';
import { ControllerOptions, MethodHookFunc } from './router-manager';
type ModelOptions = {
    controller: Type<any>[];
};
export declare const Controller: (baseUrl?: string, options?: ControllerOptions) => <TFunction extends (new (...args: any[]) => any) & Type<any>>(target: TFunction) => TFunction;
export declare const ControllerModel: (options: ModelOptions) => <TFunction extends (new (...args: any[]) => any) & Type<any>>(target: TFunction) => TFunction;
export declare const Get: (url: string, ...middleware: RequestHandler<any, any, any, import("qs").ParsedQs, Record<string, any>>[]) => MethodDecorator;
export declare const All: (url: string, ...middleware: RequestHandler<any, any, any, import("qs").ParsedQs, Record<string, any>>[]) => MethodDecorator;
export declare const Use: (url?: string | RequestHandler<any, any, any, import("qs").ParsedQs, Record<string, any>>, ...middleware: RequestHandler<any, any, any, import("qs").ParsedQs, Record<string, any>>[]) => MethodDecorator;
export declare const Put: (url: string, ...middleware: RequestHandler<any, any, any, import("qs").ParsedQs, Record<string, any>>[]) => MethodDecorator;
export declare const Post: (url: string, ...middleware: RequestHandler<any, any, any, import("qs").ParsedQs, Record<string, any>>[]) => MethodDecorator;
export declare const Param: (url: string, ...middleware: RequestHandler<any, any, any, import("qs").ParsedQs, Record<string, any>>[]) => MethodDecorator;
export declare const Delete: (url: string, ...middleware: RequestHandler<any, any, any, import("qs").ParsedQs, Record<string, any>>[]) => MethodDecorator;
export declare const Options: (url: string, ...middleware: RequestHandler<any, any, any, import("qs").ParsedQs, Record<string, any>>[]) => MethodDecorator;
export declare const Middleware: (...args: RequestHandler<any, any, any, import("qs").ParsedQs, Record<string, any>>[]) => MethodDecorator;
export declare const CustomMethod: (hook: MethodHookFunc) => (options?: any) => MethodDecorator;
export declare const Ip: () => ParameterDecorator;
export declare const Req: () => ParameterDecorator;
export declare const Res: () => ParameterDecorator;
export declare const Next: () => ParameterDecorator;
export declare const Body: (key?: string) => ParameterDecorator;
export declare const Query: (key?: string) => ParameterDecorator;
export declare const Params: (key?: string) => ParameterDecorator;
export declare const Headers: (key?: string) => ParameterDecorator;
export declare const CustomParams: (transform: hookFunc) => (options?: any) => ParameterDecorator;
export {};
