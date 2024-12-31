import { __awaiter, __decorate, __metadata } from "tslib";
/* eslint-disable no-await-in-loop */
import { ApplicationPlugin, Prov, Register } from '@hwy-fm/core/platform/decorator';
import { Inject, Injector, reflectCapabilities } from '@hwy-fm/di';
import { AsyncLocalStorage } from 'async_hooks';
import express from 'express';
import { SERVER_HANDLER } from '../token';
import { CONTROLLER_MODULE, CTX_STORAGE, MODULE_QUEUE } from './constant';
import { Context } from './context';
import { RouterManager } from './router-manager';
let ControllerManager = class ControllerManager {
    serverHandler(storage, app) {
        return (req, res) => storage.run(new Context(this.injector, req, res), () => app(req, res));
    }
    sortByOrder(arr) {
        return arr.sort((item) => item.__order__ || 0);
    }
    registerControllerModel(type) {
        return __awaiter(this, void 0, void 0, function* () {
            const { controller = [] } = reflectCapabilities.getAnnotation(type, CONTROLLER_MODULE);
            for (const control of this.sortByOrder(controller)) {
                yield this.routerManager.register(type, control);
            }
        });
    }
    register() {
        return __awaiter(this, void 0, void 0, function* () {
            for (const module of this.sortByOrder(this.injector.get(MODULE_QUEUE) || [])) {
                yield this.registerControllerModel(module);
            }
        });
    }
};
ControllerManager.__order__ = Infinity;
__decorate([
    Inject(Injector),
    __metadata("design:type", Injector)
], ControllerManager.prototype, "injector", void 0);
__decorate([
    Inject(RouterManager),
    __metadata("design:type", RouterManager)
], ControllerManager.prototype, "routerManager", void 0);
__decorate([
    Prov(SERVER_HANDLER, { deps: [CTX_STORAGE, express] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [AsyncLocalStorage, Function]),
    __metadata("design:returntype", void 0)
], ControllerManager.prototype, "serverHandler", null);
ControllerManager = __decorate([
    Register([
        { provide: express, useFactory: () => express() },
        { provide: CTX_STORAGE, useFactory: () => new AsyncLocalStorage() }
    ]),
    ApplicationPlugin()
], ControllerManager);
export { ControllerManager };
