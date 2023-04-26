"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControllerManager = void 0;
var tslib_1 = require("tslib");
/* eslint-disable no-await-in-loop */
var di_1 = require("@fm/di");
var constant_1 = require("./constant");
var router_manager_1 = require("./router-manager");
var ControllerManager = /** @class */ (function () {
    function ControllerManager() {
    }
    ControllerManager_1 = ControllerManager;
    ControllerManager.getFactoryControlModel = function (type) {
        (0, di_1.setInjectableDef)(type);
        ControllerManager_1.moduleQueue.push(type);
    };
    ControllerManager.prototype.registerControllerModel = function (type) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a, controller, module, _i, controller_1, control;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = di_1.reflectCapabilities.getAnnotation(type, constant_1.CONTROLLER_MODULE).controller, controller = _a === void 0 ? [] : _a;
                        module = this.injector.get(type);
                        _i = 0, controller_1 = controller;
                        _b.label = 1;
                    case 1:
                        if (!(_i < controller_1.length)) return [3 /*break*/, 4];
                        control = controller_1[_i];
                        return [4 /*yield*/, this.routerManager.register(module, control)];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/, module];
                }
            });
        });
    };
    ControllerManager.prototype.register = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var moduleList, _i, moduleList_1, module_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        moduleList = ControllerManager_1.moduleQueue.sort(function (module) { return module.__order__ || 0; });
                        _i = 0, moduleList_1 = moduleList;
                        _a.label = 1;
                    case 1:
                        if (!(_i < moduleList_1.length)) return [3 /*break*/, 4];
                        module_1 = moduleList_1[_i];
                        return [4 /*yield*/, this.registerControllerModel(module_1)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/, this];
                }
            });
        });
    };
    var ControllerManager_1;
    ControllerManager.moduleQueue = [];
    tslib_1.__decorate([
        (0, di_1.Inject)(di_1.Injector),
        tslib_1.__metadata("design:type", di_1.Injector)
    ], ControllerManager.prototype, "injector", void 0);
    tslib_1.__decorate([
        (0, di_1.Inject)(router_manager_1.RouterManager),
        tslib_1.__metadata("design:type", router_manager_1.RouterManager)
    ], ControllerManager.prototype, "routerManager", void 0);
    ControllerManager = ControllerManager_1 = tslib_1.__decorate([
        (0, di_1.Injectable)()
    ], ControllerManager);
    return ControllerManager;
}());
exports.ControllerManager = ControllerManager;
