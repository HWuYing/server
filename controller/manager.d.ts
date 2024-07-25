import { Injector } from '@hwy-fm/di';
import { AsyncLocalStorage } from 'async_hooks';
import express from 'express';
import { Context } from './context';
import { RouterManager } from './router-manager';
export declare class ControllerManager {
    static __order__: number;
    injector: Injector;
    routerManager: RouterManager;
    protected serverHandler(storage: AsyncLocalStorage<Context>, app: express.Application): (req: any, res: any) => any;
    private sortByOrder;
    private registerControllerModel;
    register(): Promise<void>;
}
