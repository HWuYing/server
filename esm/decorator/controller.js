/* eslint-disable max-params */
import { convertToFactory, Injector, makeDecorator, makeMethodDecorator, reflectCapabilities, setInjectableDef } from '@fm/di';
import express, { Router } from 'express';
const CONTROL = 'Control';
const MIDDLEWARE = 'MIDDLEWARE';
var RequestMethod;
(function (RequestMethod) {
    RequestMethod["post"] = "post";
    RequestMethod["get"] = "get";
    RequestMethod["delete"] = "delete";
    RequestMethod["put"] = "put";
    RequestMethod["all"] = "all";
    RequestMethod["options"] = "options";
    RequestMethod["param"] = "param";
    RequestMethod["use"] = "use";
})(RequestMethod || (RequestMethod = {}));
const props = (url, ...middleware) => ({ url, middleware });
function type(typeName) {
    return (obj) => Object.prototype.toString.call(obj).replace(/\[Object ([^\]]*)\]/ig, '$1').toLowerCase() === typeName;
}
function replaceUrl(url) {
    return `/${url}`.replace(/[\\/]+/g, '/');
}
const typeFunc = type('function');
const typeString = type('string');
function excelAnnotations(annotations, ...options) {
    let result = options;
    const _annotations = [...annotations];
    while (_annotations.length) {
        const annotation = _annotations.shift();
        const { hook = (_a, r) => r } = annotation;
        result = [typeFunc(hook) ? hook(annotation, ...result) : hook, ...options];
    }
    return result.shift();
}
function methodParams(injector, type, cls, method, agent) {
    const paramAnnotations = reflectCapabilities.getParamAnnotations(type, method);
    return (...params) => {
        if (paramAnnotations.length) {
            params = paramAnnotations.map((annotations) => excelAnnotations(annotations, injector, ...params));
        }
        return agent(...params);
    };
}
function registerRouter(injector, type, cls) {
    const map = new Map();
    const router = Router();
    const { __methods__ = [] } = type;
    __methods__.forEach((methodMetadata) => {
        const { descriptor, method, annotationInstance: { url, middleware, metadataName } } = methodMetadata;
        if (!map.has(descriptor)) {
            map.set(descriptor, methodParams(injector, type, cls, method, (...args) => descriptor.value.apply(cls, args)));
        }
        if (metadataName === MIDDLEWARE)
            return map.get(descriptor)(router);
        if (metadataName === RequestMethod[metadataName]) {
            const params = url ? [typeString(url) ? replaceUrl(url) : url] : [];
            router[metadataName].call(router, ...params.concat(...middleware, map.get(descriptor)));
        }
    });
    map.clear();
    return router;
}
export const Controller = makeDecorator(CONTROL, undefined, (cls, baseUrl) => {
    function useFactory(app, injector) {
        const newCls = convertToFactory(cls)();
        const router = registerRouter(injector, cls, newCls);
        typeString(baseUrl) ? app.use(replaceUrl(baseUrl), router) : app.use(router);
        return newCls;
    }
    setInjectableDef(cls, { provide: cls, useFactory, deps: [express, Injector] });
});
export const [Get, All, Use, Put, Post, Param, Delete, Options, Middleware] = [
    RequestMethod.get,
    RequestMethod.all,
    RequestMethod.use,
    RequestMethod.put,
    RequestMethod.post,
    RequestMethod.param,
    RequestMethod.delete,
    RequestMethod.options,
    MIDDLEWARE
].map((method) => makeMethodDecorator(method, props));
