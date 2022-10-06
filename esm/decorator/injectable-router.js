import { __awaiter } from "tslib";
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
const __ROUTER__ = '__ROUTER__';
const rootInjector = getProvider(Injector);
const factoryRouterDecoratorMethod = (method) => (url) => (prototype, key) => {
    if (!prototype[__ROUTER__]) {
        Object.defineProperty(prototype, __ROUTER__, { value: [] });
    }
    prototype[__ROUTER__].push({ method, url, agent: prototype[key] });
};
const createFactoryRouter = (baseUrl, clazz) => (injector) => {
    const router = Router();
    const routeItems = clazz.prototype[__ROUTER__] || [];
    const newClazz = injector.createClass(clazz);
    routeItems.forEach(({ method, url, agent }) => {
        const routeUrl = `${baseUrl}/${url}`.replace(/[\\/]+/g, '/');
        router[method].call(router, routeUrl, [], (...args) => __awaiter(void 0, void 0, void 0, function* () { return agent.apply(newClazz, args); }));
    });
    return router;
};
export const InjectableRouter = (baseUrl = '') => (clazz) => {
    rootInjector.set(clazz, { provide: clazz, useFactory: createFactoryRouter(baseUrl, clazz), deps: [Injector] });
    return clazz;
};
export const Post = factoryRouterDecoratorMethod(RouterMethod.post);
export const Get = factoryRouterDecoratorMethod(RouterMethod.get);
export const Delete = factoryRouterDecoratorMethod(RouterMethod.delete);
export const Put = factoryRouterDecoratorMethod(RouterMethod.put);
export const All = factoryRouterDecoratorMethod(RouterMethod.all);
export const Param = factoryRouterDecoratorMethod(RouterMethod.param);
export const Use = factoryRouterDecoratorMethod(RouterMethod.use);
export const Options = factoryRouterDecoratorMethod(RouterMethod.options);
