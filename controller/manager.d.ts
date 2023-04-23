import { Injector, InjectorToken, Type } from '@fm/di';
import { RouterManager } from './router-manager';
export type ControllerModelOptions = {
    controller: Type<any>[];
};
export declare const CONTROLLER_MODEL: InjectorToken;
export declare class ControllerManager {
    injector: Injector;
    routerManager: RouterManager;
    static getFactoryControlModel(type: Type<any>, options: ControllerModelOptions): {
        provide: InjectorToken;
        useFactory: (manage: ControllerManager) => any;
        multi: boolean;
        deps: (typeof ControllerManager)[];
    };
    private registerControllerModel;
    register(): Promise<void>;
}
