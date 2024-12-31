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
    formatUrl: (url: string) => string;
    private checkRouterMethod;
    private createAgent;
    private getResponseHeaders;
    private transformEmbedded;
    private getEmbeddedMiddleware;
    private transformUrl;
    private createRouter;
    register(_module: Type, controller: Type): Promise<any>;
}
export {};
