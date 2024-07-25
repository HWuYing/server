import { Injector, MethodProxy, Type } from '@hwy-fm/di';
import { Express, RequestHandler } from 'express';
type MType = RequestHandler;
export type FactoryEmbedded<T extends any[] = never, M = MType> = (...args: T) => M | Array<M>;
export interface MiddlewareType<T extends any[] = never, M = MType> {
    middleware: FactoryEmbedded<T, M>;
}
export declare class RouterManager {
    app: Express;
    injector: Injector;
    mp: MethodProxy;
    private checkRouterMethod;
    private createAgent;
    private transformEmbedded;
    private getEmbeddedMiddleware;
    private transformUrl;
    private createRouter;
    register(_module: any, controller: Type): Promise<any>;
}
export {};
