"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControllerManager = void 0;
var tslib_1 = require("tslib");
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
        var _a = di_1.reflectCapabilities.getAnnotation(type, constant_1.CONTROLLER_MODULE).controller, controller = _a === void 0 ? [] : _a;
        var module = this.injector.get(type);
        for (var i = 0; i < controller.length; i++) {
            this.routerManager.register(module, controller[i]);
        }
        return module;
    };
    ControllerManager.prototype.register = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var moduleList;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                moduleList = ControllerManager_1.moduleQueue.sort(function (module) { return module.__order__ || 0; });
                moduleList.forEach(function (module) { return _this.registerControllerModel(module); });
                return [2 /*return*/, this];
            });
        });
    };
    var ControllerManager_1;
    ControllerManager.moduleQueue = [];
    tslib_1.__decorate([
        (0, di_1.Prop)(di_1.Injector),
        tslib_1.__metadata("design:type", di_1.Injector)
    ], ControllerManager.prototype, "injector", void 0);
    tslib_1.__decorate([
        (0, di_1.Prop)(router_manager_1.RouterManager),
        tslib_1.__metadata("design:type", router_manager_1.RouterManager)
    ], ControllerManager.prototype, "routerManager", void 0);
    ControllerManager = ControllerManager_1 = tslib_1.__decorate([
        (0, di_1.Injectable)()
    ], ControllerManager);
    return ControllerManager;
}());
exports.ControllerManager = ControllerManager;
