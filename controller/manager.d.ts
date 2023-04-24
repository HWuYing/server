import { Injector, Type } from '@fm/di';
import { RouterManager } from './router-manager';
export type ModelOptions = {
    controller: Type<any>[];
};
export declare class ControllerManager {
    static moduleQueue: Type<any>[];
    static getFactoryControlModel(type: Type<any>): void;
    injector: Injector;
    routerManager: RouterManager;
    private registerControllerModel;
    register(): Promise<this>;
}
