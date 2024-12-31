import { Injector } from '@hwy-fm/di';
import type { NextFunction, Request, RequestHandler, Response, Router } from 'express';
import { type Options } from 'http-proxy-middleware';
import { Agent } from 'https';
export interface ProxyOptions {
    load(): Options | Promise<Options>;
}
export declare class Register {
    injector: Injector;
    protected agent: Agent;
    protected middlewareMap: Map<string, RequestHandler>;
    protected loadOptions(options?: any): Promise<any>;
    protected pathRewrite(options: any, pathname: string, req: Request): Promise<any>;
    protected createProxyMiddleware(element: any): RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
    proxyCall(host: string, req: Request, res: Response, next: NextFunction): Promise<any>;
    createProxy(element: any): Promise<void>;
    createMiddleware(config: any, router: Router): Promise<void>;
}
