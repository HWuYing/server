import { Injector } from '@fm/di';
import { NextFunction, Request, Response } from 'express';
export declare enum RouterParams {
    req = "req",
    res = "res",
    next = "next",
    custom = "custom"
}
export interface FmContext {
    readonly injector: Injector;
    readonly req: Request;
    readonly res: Response;
}
export type hookFunc = (metadata: any, data: any, ctx: FmContext, next: NextFunction) => any;
export declare class Context implements FmContext {
    readonly injector: Injector;
    readonly req: Request;
    readonly res: Response;
    constructor(injector: Injector, req: Request, res: Response);
    private getParamByMetadata;
    private excelAnnotations;
    injectArgs(annotations: any[], _req: Request, _res: Response, next: NextFunction): any[];
}
