"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControllerManager = exports.CONTROLLER_MODEL = void 0;
var tslib_1 = require("tslib");
var di_1 = require("@fm/di");
var ctx_controller_1 = require("./built-in/ctx.controller");
var router_manager_1 = require("./router-manager");
exports.CONTROLLER_MODEL = di_1.InjectorToken.get('CONTROLLER_MODEL');
var ControllerManager = /** @class */ (function () {
    function ControllerManager() {
    }
    ControllerManager_1 = ControllerManager;
    ControllerManager.getFactoryControlModel = function (type, options) {
        var useFactory = function (manage) { return manage.registerControllerModel(type, options); };
        return { provide: exports.CONTROLLER_MODEL, useFactory: useFactory, multi: true, deps: [ControllerManager_1] };
    };
    ControllerManager.prototype.registerControllerModel = function (type, options) {
        var _a = options.controller, controller = _a === void 0 ? [] : _a;
        for (var i = 0; i < controller.length; i++) {
            this.routerManager.register(controller[i]);
        }
        return this.injector.get(type);
    };
    ControllerManager.prototype.register = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.routerManager.register(ctx_controller_1.Ctx);
                this.injector.get(exports.CONTROLLER_MODEL);
                return [2 /*return*/];
            });
        });
    };
    var ControllerManager_1;
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
