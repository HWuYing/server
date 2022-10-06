import { __awaiter, __generator } from "tslib";
import { getProvider, Injector } from '@fm/di';
import { Router } from 'express';
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
var rootInjector = getProvider(Injector);
var factoryRouterDecoratorMethod = function (method) { return function (url) { return function (prototype, key) {
    if (!prototype[__ROUTER__]) {
        Object.defineProperty(prototype, __ROUTER__, { value: [] });
    }
    prototype[__ROUTER__].push({ method: method, url: url, agent: prototype[key] });
}; }; };
var createFactoryRouter = function (baseUrl, clazz) { return function (injector) {
    var router = Router();
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
            return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, agent.apply(newClazz, args)];
            }); });
        });
    });
    return router;
}; };
export var InjectableRouter = function (baseUrl) {
    if (baseUrl === void 0) { baseUrl = ''; }
    return function (clazz) {
        rootInjector.set(clazz, { provide: clazz, useFactory: createFactoryRouter(baseUrl, clazz), deps: [Injector] });
        return clazz;
    };
};
export var Post = factoryRouterDecoratorMethod(RouterMethod.post);
export var Get = factoryRouterDecoratorMethod(RouterMethod.get);
export var Delete = factoryRouterDecoratorMethod(RouterMethod.delete);
export var Put = factoryRouterDecoratorMethod(RouterMethod.put);
export var All = factoryRouterDecoratorMethod(RouterMethod.all);
export var Param = factoryRouterDecoratorMethod(RouterMethod.param);
export var Use = factoryRouterDecoratorMethod(RouterMethod.use);
export var Options = factoryRouterDecoratorMethod(RouterMethod.options);
