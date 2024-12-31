import { __awaiter, __decorate, __generator, __metadata } from "tslib";
/* eslint-disable no-await-in-loop */
import { ApplicationPlugin } from '@hwy-fm/core/platform/decorator';
import { Inject, Injector } from '@hwy-fm/di';
import { QUEUE } from './constant';
import { Register } from './register';
var ProxyPlugin = /** @class */ (function () {
    function ProxyPlugin() {
    }
    ProxyPlugin.prototype.register = function () {
        return __awaiter(this, void 0, void 0, function () {
            var register, _i, _a, element;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        register = this.injector.get(Register);
                        _i = 0, _a = this.injector.get(QUEUE) || [];
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
    __decorate([
        Inject(Injector),
        __metadata("design:type", Injector)
    ], ProxyPlugin.prototype, "injector", void 0);
    ProxyPlugin = __decorate([
        ApplicationPlugin()
    ], ProxyPlugin);
    return ProxyPlugin;
}());
export { ProxyPlugin };
