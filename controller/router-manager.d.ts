import { Injector, MethodProxy, Type } from '@hwy-fm/di';
import { Express, RequestHandler } from 'express';
type MType = RequestHandler;
export type FactoryEmbedded<T extends any[] = []> = (...args: T) => MType | Array<MType>;
export interface MiddlewareType<T extends any[] = []> {
    middleware: FactoryEmbedded<T>;
}
export declare class RouterManager {
    app: Express;
    injector: Injector;
    mp: MethodProxy;
    private checkRouterMethod;
    private createAgent;
    private getEmbeddedMiddleware;
    private createRouter;
    register(_module: any, controller: Type): Promise<any>;
}
export {};
