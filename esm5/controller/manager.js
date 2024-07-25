import { __awaiter, __decorate, __generator, __metadata } from "tslib";
/* eslint-disable no-await-in-loop */
import { ApplicationPlugin, Prov, Register } from '@hwy-fm/core/platform/decorator';
import { Inject, Injector, reflectCapabilities } from '@hwy-fm/di';
import { AsyncLocalStorage } from 'async_hooks';
import express from 'express';
import { SERVER_HANDLER } from '../token';
import { CONTROLLER_MODULE, CTX_STORAGE, MODULE_QUEUE } from './constant';
import { Context } from './context';
import { RouterManager } from './router-manager';
var ControllerManager = /** @class */ (function () {
    function ControllerManager() {
    }
    ControllerManager.prototype.serverHandler = function (storage, app) {
        var _this = this;
        return function (req, res) { return storage.run(new Context(_this.injector, req, res), function () { return app(req, res); }); };
    };
    ControllerManager.prototype.sortByOrder = function (arr) {
        return arr.sort(function (item) { return item.__order__ || 0; });
    };
    ControllerManager.prototype.registerControllerModel = function (type) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, controller, module, _i, _b, control;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = reflectCapabilities.getAnnotation(type, CONTROLLER_MODULE).controller, controller = _a === void 0 ? [] : _a;
                        module = this.injector.get(type);
                        _i = 0, _b = this.sortByOrder(controller);
                        _c.label = 1;
                    case 1:
                        if (!(_i < _b.length)) return [3 /*break*/, 4];
                        control = _b[_i];
                        return [4 /*yield*/, this.routerManager.register(module, control)];
                    case 2:
                        _c.sent();
                        _c.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ControllerManager.prototype.register = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _i, _a, module_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _i = 0, _a = this.sortByOrder(this.injector.get(MODULE_QUEUE) || []);
                        _b.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 4];
                        module_1 = _a[_i];
                        return [4 /*yield*/, this.registerControllerModel(module_1)];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        });
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
            { provide: express, useFactory: function () { return express(); } },
            { provide: CTX_STORAGE, useValue: new AsyncLocalStorage() }
        ]),
        ApplicationPlugin()
    ], ControllerManager);
    return ControllerManager;
}());
export { ControllerManager };
