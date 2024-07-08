import './built-in/built-in.module';
import { Injector } from '@hwy-fm/di';
import { RouterManager } from './router-manager';
export declare class ControllerManager {
    static __order__: number;
    injector: Injector;
    routerManager: RouterManager;
    private sortByOrder;
    private registerControllerModel;
    register(): Promise<void>;
}
