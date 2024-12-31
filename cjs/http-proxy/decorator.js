"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpMiddleware = exports.HttpProxy = void 0;
var tslib_1 = require("tslib");
var decorator_1 = require("@hwy-fm/core/platform/decorator");
var di_1 = require("@hwy-fm/di");
var controller_1 = require("../controller");
var constant_1 = require("./constant");
var register_1 = require("./register");
var register;
var registerHttpProxy = (0, decorator_1.createRegisterLoader)(constant_1.QUEUE);
(0, decorator_1.runtimeInjector)(function (i) { return register = i.get(register_1.Register); });
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
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, register.proxyCall.apply(register, tslib_1.__spreadArray([host], args, false))];
            });
        });
    };
}
function httpMiddlewareTypeFn(target, method, descriptor) {
    var originValue = descriptor.value;
    (0, controller_1.Middleware)()(target.prototype, method, descriptor);
    descriptor.value = function (router) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var config;
            return tslib_1.__generator(this, function (_a) {
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
exports.HttpProxy = (0, di_1.makeMethodDecorator)(constant_1.PROXY, undefined, httpProxyTypeFn);
exports.HttpMiddleware = (0, di_1.makeMethodDecorator)(constant_1.MIDDLEWARE, undefined, httpMiddlewareTypeFn);
