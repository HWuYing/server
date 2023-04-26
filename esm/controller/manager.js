var ControllerManager_1;
import { __awaiter, __decorate, __metadata } from "tslib";
/* eslint-disable no-await-in-loop */
import { Inject, Injectable, Injector, reflectCapabilities, setInjectableDef } from '@fm/di';
import { CONTROLLER_MODULE } from './constant';
import { RouterManager } from './router-manager';
let ControllerManager = ControllerManager_1 = class ControllerManager {
    static getFactoryControlModel(type) {
        setInjectableDef(type);
        ControllerManager_1.moduleQueue.push(type);
    }
    registerControllerModel(type) {
        return __awaiter(this, void 0, void 0, function* () {
            const { controller = [] } = reflectCapabilities.getAnnotation(type, CONTROLLER_MODULE);
            const module = this.injector.get(type);
            for (const control of controller) {
                yield this.routerManager.register(module, control);
            }
            return module;
        });
    }
    register() {
        return __awaiter(this, void 0, void 0, function* () {
            const moduleList = ControllerManager_1.moduleQueue.sort((module) => module.__order__ || 0);
            for (const module of moduleList) {
                yield this.registerControllerModel(module);
            }
            return this;
        });
    }
};
ControllerManager.moduleQueue = [];
__decorate([
    Inject(Injector),
    __metadata("design:type", Injector)
], ControllerManager.prototype, "injector", void 0);
__decorate([
    Inject(RouterManager),
    __metadata("design:type", RouterManager)
], ControllerManager.prototype, "routerManager", void 0);
ControllerManager = ControllerManager_1 = __decorate([
    Injectable()
], ControllerManager);
export { ControllerManager };
