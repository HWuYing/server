import { Injector, Type } from '@fm/di';
import { Express, RouterOptions } from 'express';
export type ControllerOptions = {
    options?: RouterOptions;
};
export declare class RouterManager {
    app: Express;
    injector: Injector;
    private methodParams;
    private createRouter;
    register(_module: any, controller: Type<any>): any;
}
