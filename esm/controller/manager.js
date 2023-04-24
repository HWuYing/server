var ControllerManager_1;
import { __awaiter, __decorate, __metadata } from "tslib";
import { Injectable, Injector, Prop, reflectCapabilities, setInjectableDef } from '@fm/di';
import { CONTROLLER_MODULE } from './constant';
import { RouterManager } from './router-manager';
let ControllerManager = ControllerManager_1 = class ControllerManager {
    static getFactoryControlModel(type) {
        setInjectableDef(type);
        ControllerManager_1.moduleQueue.push(type);
    }
    registerControllerModel(type) {
        const { controller = [] } = reflectCapabilities.getAnnotation(type, CONTROLLER_MODULE);
        const module = this.injector.get(type);
        for (let i = 0; i < controller.length; i++) {
            this.routerManager.register(module, controller[i]);
        }
        return module;
    }
    register() {
        return __awaiter(this, void 0, void 0, function* () {
            const moduleList = ControllerManager_1.moduleQueue.sort((module) => module.__order__ || 0);
            moduleList.forEach((module) => this.registerControllerModel(module));
            return this;
        });
    }
};
ControllerManager.moduleQueue = [];
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
