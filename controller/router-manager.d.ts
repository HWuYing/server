import { Injector, Type } from '@fm/di';
import { Express, NextFunction, RouterOptions } from 'express';
import { FmContext } from './context';
export type ControllerOptions = {
    options?: RouterOptions;
};
export type MethodHookFunc = (metadata: any, ctx: FmContext, next: NextFunction) => any;
export declare class RouterManager {
    app: Express;
    injector: Injector;
    private excelMethodAnnotations;
    private methodParams;
    private createRouter;
    register(_module: any, controller: Type<any>): Promise<any>;
}
