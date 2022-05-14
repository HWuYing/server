"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Options = exports.Use = exports.Param = exports.All = exports.Put = exports.Delete = exports.Get = exports.Post = exports.InjectableRouter = void 0;
const di_1 = require("@fm/di");
const express_1 = require("express");
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
const __ROUTER__ = '__ROUTER__';
const rootInjector = (0, di_1.getProvider)(di_1.Injector);
const factoryRouterDecoratorMethod = (method) => (url) => (prototype, key) => {
    if (!prototype[__ROUTER__]) {
        Object.defineProperty(prototype, __ROUTER__, { value: [] });
    }
    prototype[__ROUTER__].push({ method, url, agent: prototype[key] });
};
const createFactoryRouter = (baseUrl, clazz) => (injector) => {
    const router = (0, express_1.Router)();
    const routeItems = clazz.prototype[__ROUTER__] || [];
    const newClazz = injector.createClass(clazz);
    routeItems.forEach(({ method, url, agent }) => {
        const routeUrl = `${baseUrl}/${url}`.replace(/[\\/]+/g, '/');
        router[method].call(router, routeUrl, [], async (...args) => agent.apply(newClazz, args));
    });
    return router;
};
const InjectableRouter = (baseUrl = '') => (clazz) => {
    rootInjector.set(clazz, { provide: clazz, useFactory: createFactoryRouter(baseUrl, clazz), deps: [di_1.Injector] });
    return clazz;
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
