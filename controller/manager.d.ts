import './built-in/built-in.module';
import { Injector } from '@fm/di';
import { RouterManager } from './router-manager';
export declare class ControllerManager {
    injector: Injector;
    routerManager: RouterManager;
    private sortByOrder;
    private registerControllerModel;
    register(): Promise<this>;
}
