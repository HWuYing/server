import { Injector, Type } from '@fm/di';
import { RouterManager } from './router-manager';
export declare function getFactoryControlModel(type: Type<any>): void;
export declare class ControllerManager {
    injector: Injector;
    routerManager: RouterManager;
    private registerControllerModel;
    register(): Promise<this>;
}
