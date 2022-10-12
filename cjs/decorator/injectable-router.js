"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Options = exports.Use = exports.Param = exports.All = exports.Put = exports.Delete = exports.Get = exports.Post = exports.InjectableRouter = void 0;
var tslib_1 = require("tslib");
var di_1 = require("@fm/di");
var express_1 = require("express");
var RouterMethod;
(function (RouterMethod) {
    RouterMethod["post"] = "post";
    RouterMethod["get"] = "get";
    RouterMethod["delete"] = "delete";
    RouterMethod["put"] = "put";
    RouterMethod["all"] = "all";
    RouterMethod["options"] = "options";
    RouterMethod["param"] = "param";
    RouterMethod["use"] = "use";
})(RouterMethod || (RouterMethod = {}));
var __ROUTER__ = '__ROUTER__';
var rootInjector = (0, di_1.getProvider)(di_1.Injector);
var factoryRouterDecoratorMethod = function (method) { return function (url) { return function (prototype, key) {
    if (!prototype[__ROUTER__]) {
        Object.defineProperty(prototype, __ROUTER__, { value: [] });
    }
    prototype[__ROUTER__].push({ method: method, url: url, agent: prototype[key] });
}; }; };
var createFactoryRouter = function (baseUrl, clazz) { return function (injector) {
    var router = (0, express_1.Router)();
    var routeItems = clazz.prototype[__ROUTER__] || [];
    var newClazz = injector.createClass(clazz);
    routeItems.forEach(function (_a) {
        var method = _a.method, url = _a.url, agent = _a.agent;
        var routeUrl = "".concat(baseUrl, "/").concat(url).replace(/[\\/]+/g, '/');
        router[method].call(router, routeUrl, [], function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return tslib_1.__awaiter(void 0, void 0, void 0, function () { return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, agent.apply(newClazz, args)];
            }); });
        });
    });
    return router;
}; };
var InjectableRouter = function (baseUrl) {
    if (baseUrl === void 0) { baseUrl = ''; }
    return function (clazz) {
        rootInjector.set(clazz, { provide: clazz, useFactory: createFactoryRouter(baseUrl, clazz), deps: [di_1.Injector] });
        return clazz;
    };
};
exports.InjectableRouter = InjectableRouter;
exports.Post = factoryRouterDecoratorMethod(RouterMethod.post);
exports.Get = factoryRouterDecoratorMethod(RouterMethod.get);
exports.Delete = factoryRouterDecoratorMethod(RouterMethod.delete);
exports.Put = factoryRouterDecoratorMethod(RouterMethod.put);
exports.All = factoryRouterDecoratorMethod(RouterMethod.all);
exports.Param = factoryRouterDecoratorMethod(RouterMethod.param);
exports.Use = factoryRouterDecoratorMethod(RouterMethod.use);
exports.Options = factoryRouterDecoratorMethod(RouterMethod.options);
