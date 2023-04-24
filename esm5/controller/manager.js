import { __awaiter, __decorate, __generator, __metadata } from "tslib";
import { Injectable, Injector, Prop, reflectCapabilities, setInjectableDef } from '@fm/di';
import { CONTROLLER_MODULE } from './constant';
import { RouterManager } from './router-manager';
var ControllerManager = /** @class */ (function () {
    function ControllerManager() {
    }
    ControllerManager_1 = ControllerManager;
    ControllerManager.getFactoryControlModel = function (type) {
        setInjectableDef(type);
        ControllerManager_1.moduleQueue.push(type);
    };
    ControllerManager.prototype.registerControllerModel = function (type) {
        var _a = reflectCapabilities.getAnnotation(type, CONTROLLER_MODULE).controller, controller = _a === void 0 ? [] : _a;
        var module = this.injector.get(type);
        for (var i = 0; i < controller.length; i++) {
            this.routerManager.register(module, controller[i]);
        }
        return module;
    };
    ControllerManager.prototype.register = function () {
        return __awaiter(this, void 0, void 0, function () {
            var moduleList;
            var _this = this;
            return __generator(this, function (_a) {
                moduleList = ControllerManager_1.moduleQueue.sort(function (module) { return module.__order__ || 0; });
                moduleList.forEach(function (module) { return _this.registerControllerModel(module); });
                return [2 /*return*/, this];
            });
        });
    };
    var ControllerManager_1;
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
    return ControllerManager;
}());
export { ControllerManager };
