var ControllerManager_1;
import { __awaiter, __decorate, __metadata } from "tslib";
import { Injectable, Injector, InjectorToken, Prop } from '@fm/di';
import { Ctx } from './built-in/ctx.controller';
import { RouterManager } from './router-manager';
export const CONTROLLER_MODEL = InjectorToken.get('CONTROLLER_MODEL');
let ControllerManager = ControllerManager_1 = class ControllerManager {
    static getFactoryControlModel(type, options) {
        const useFactory = (manage) => manage.registerControllerModel(type, options);
        return { provide: CONTROLLER_MODEL, useFactory, multi: true, deps: [ControllerManager_1] };
    }
    registerControllerModel(type, options) {
        const { controller = [] } = options;
        for (let i = 0; i < controller.length; i++) {
            this.routerManager.register(controller[i]);
        }
        return this.injector.get(type);
    }
    register() {
        return __awaiter(this, void 0, void 0, function* () {
            this.routerManager.register(Ctx);
            this.injector.get(CONTROLLER_MODEL);
        });
    }
};
__decorate([
    Prop(Injector),
    __metadata("design:type", Injector)
], ControllerManager.prototype, "injector", void 0);
__decorate([
    Prop(RouterManager),
    __metadata("design:type", RouterManager)
], ControllerManager.prototype, "routerManager", void 0);
ControllerManager = ControllerManager_1 = __decorate([
    Injectable()
], ControllerManager);
export { ControllerManager };
