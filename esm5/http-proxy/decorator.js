import { __awaiter, __generator, __spreadArray } from "tslib";
import { createRegisterLoader, runtimeInjector } from '@hwy-fm/core/platform/decorator';
import { makeMethodDecorator } from '@hwy-fm/di';
import { Middleware } from '../controller';
import { MIDDLEWARE, PROXY, QUEUE } from './constant';
import { Register } from './register';
var register;
var registerHttpProxy = createRegisterLoader(QUEUE);
runtimeInjector(function (i) { return register = i.get(Register); });
function httpProxyTypeFn(target, method, descriptor) {
    var params = [];
    for (var _i = 3; _i < arguments.length; _i++) {
        params[_i - 3] = arguments[_i];
    }
    var host = params[0], _a = params[1], options = _a === void 0 ? {} : _a;
    registerHttpProxy({ target: target, method: method, host: host, pathRewrite: descriptor.value, options: options });
    descriptor.value = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, register.proxyCall.apply(register, __spreadArray([host], args, false))];
            });
        });
    };
}
function httpMiddlewareTypeFn(target, method, descriptor) {
    var originValue = descriptor.value;
    Middleware()(target.prototype, method, descriptor);
    descriptor.value = function (router) {
        return __awaiter(this, void 0, void 0, function () {
            var config;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, originValue.call(this)];
                    case 1:
                        config = _a.sent();
                        return [4 /*yield*/, register.createMiddleware(config, router)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
}
export var HttpProxy = makeMethodDecorator(PROXY, undefined, httpProxyTypeFn);
export var HttpMiddleware = makeMethodDecorator(MIDDLEWARE, undefined, httpMiddlewareTypeFn);
