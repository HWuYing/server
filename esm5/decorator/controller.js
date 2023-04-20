var _b;
import { __spreadArray } from "tslib";
/* eslint-disable max-params */
import { convertToFactory, Injector, makeDecorator, makeMethodDecorator, reflectCapabilities, setInjectableDef } from '@fm/di';
import express, { Router } from 'express';
var CONTROL = 'Control';
var MIDDLEWARE = 'MIDDLEWARE';
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
var props = function (url) {
    var middleware = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        middleware[_i - 1] = arguments[_i];
    }
    return ({ url: url, middleware: middleware });
};
function type(typeName) {
    return function (obj) { return Object.prototype.toString.call(obj).replace(/\[Object ([^\]]*)\]/ig, '$1').toLowerCase() === typeName; };
}
function replaceUrl(url) {
    return "/".concat(url).replace(/[\\/]+/g, '/');
}
var typeFunc = type('function');
var typeString = type('string');
function excelAnnotations(annotations) {
    var options = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        options[_i - 1] = arguments[_i];
    }
    var result = options;
    var _annotations = __spreadArray([], annotations, true);
    while (_annotations.length) {
        var annotation = _annotations.shift();
        var _b = annotation.hook, hook = _b === void 0 ? function (_a, r) { return r; } : _b;
        result = __spreadArray([typeFunc(hook) ? hook.apply(void 0, __spreadArray([annotation], result, false)) : hook], options, true);
    }
    return result.shift();
}
function methodParams(injector, type, cls, method, agent) {
    var paramAnnotations = reflectCapabilities.getParamAnnotations(type, method);
    return function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        if (paramAnnotations.length) {
            params = paramAnnotations.map(function (annotations) { return excelAnnotations.apply(void 0, __spreadArray([annotations, injector], params, false)); });
        }
        return agent.apply(void 0, params);
    };
}
function registerRouter(injector, type, cls) {
    var map = new Map();
    var router = Router();
    var _b = type.__methods__, __methods__ = _b === void 0 ? [] : _b;
    __methods__.forEach(function (methodMetadata) {
        var _b;
        var descriptor = methodMetadata.descriptor, method = methodMetadata.method, _c = methodMetadata.annotationInstance, url = _c.url, middleware = _c.middleware, metadataName = _c.metadataName;
        if (!map.has(descriptor)) {
            map.set(descriptor, methodParams(injector, type, cls, method, function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                return descriptor.value.apply(cls, args);
            }));
        }
        if (metadataName === MIDDLEWARE)
            return map.get(descriptor)(router);
        if (metadataName === RequestMethod[metadataName]) {
            var params = url ? [typeString(url) ? replaceUrl(url) : url] : [];
            (_b = router[metadataName]).call.apply(_b, __spreadArray([router], params.concat.apply(params, __spreadArray(__spreadArray([], middleware, false), [map.get(descriptor)], false)), false));
        }
    });
    map.clear();
    return router;
}
export var Controller = makeDecorator(CONTROL, undefined, function (cls, baseUrl) {
    function useFactory(app, injector) {
        var newCls = convertToFactory(cls)();
        var router = registerRouter(injector, cls, newCls);
        typeString(baseUrl) ? app.use(replaceUrl(baseUrl), router) : app.use(router);
        return newCls;
    }
    setInjectableDef(cls, { provide: cls, useFactory: useFactory, deps: [express, Injector] });
});
export var Get = (_b = [
    RequestMethod.get,
    RequestMethod.all,
    RequestMethod.use,
    RequestMethod.put,
    RequestMethod.post,
    RequestMethod.param,
    RequestMethod.delete,
    RequestMethod.options,
    MIDDLEWARE
].map(function (method) { return makeMethodDecorator(method, props); }), _b[0]), All = _b[1], Use = _b[2], Put = _b[3], Post = _b[4], Param = _b[5], Delete = _b[6], Options = _b[7], Middleware = _b[8];
