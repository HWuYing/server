import { __awaiter, __decorate, __generator, __metadata } from "tslib";
import { Injectable, Injector, InjectorToken, Prop } from '@fm/di';
import { Ctx } from './built-in/ctx.controller';
import { RouterManager } from './router-manager';
export var CONTROLLER_MODEL = InjectorToken.get('CONTROLLER_MODEL');
var ControllerManager = /** @class */ (function () {
    function ControllerManager() {
    }
    ControllerManager_1 = ControllerManager;
    ControllerManager.getFactoryControlModel = function (type, options) {
        var useFactory = function (manage) { return manage.registerControllerModel(type, options); };
        return { provide: CONTROLLER_MODEL, useFactory: useFactory, multi: true, deps: [ControllerManager_1] };
    };
    ControllerManager.prototype.registerControllerModel = function (type, options) {
        var _a = options.controller, controller = _a === void 0 ? [] : _a;
        for (var i = 0; i < controller.length; i++) {
            this.routerManager.register(controller[i]);
        }
        return this.injector.get(type);
    };
    ControllerManager.prototype.register = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.routerManager.register(Ctx);
                this.injector.get(CONTROLLER_MODEL);
                return [2 /*return*/];
            });
        });
    };
    var ControllerManager_1;
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
