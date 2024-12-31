"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProxyPlugin = void 0;
var tslib_1 = require("tslib");
/* eslint-disable no-await-in-loop */
var decorator_1 = require("@hwy-fm/core/platform/decorator");
var di_1 = require("@hwy-fm/di");
var constant_1 = require("./constant");
var register_1 = require("./register");
var ProxyPlugin = /** @class */ (function () {
    function ProxyPlugin() {
    }
    ProxyPlugin.prototype.register = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var register, _i, _a, element;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        register = this.injector.get(register_1.Register);
                        _i = 0, _a = this.injector.get(constant_1.QUEUE) || [];
                        _b.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 4];
                        element = _a[_i];
                        return [4 /*yield*/, register.createProxy(element)];
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
    tslib_1.__decorate([
        (0, di_1.Inject)(di_1.Injector),
        tslib_1.__metadata("design:type", di_1.Injector)
    ], ProxyPlugin.prototype, "injector", void 0);
    ProxyPlugin = tslib_1.__decorate([
        (0, decorator_1.ApplicationPlugin)()
    ], ProxyPlugin);
    return ProxyPlugin;
}());
exports.ProxyPlugin = ProxyPlugin;
