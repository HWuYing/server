var _a, _b, _c, _d, _e, _f, _g, _h, _j;
import { __spreadArray } from "tslib";
import { attachInjectFlag, convertToFactory, makeDecorator, makeMethodDecorator, ROOT_SCOPE, setInjectableDef } from '@fm/di';
import { Router } from 'express';
var CONTROL = 'Control';
var FACTORY = 1;
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
    var handlers = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        handlers[_i - 1] = arguments[_i];
    }
    return ({ url: url, handlers: handlers });
};
function callMiddleware(router, methodMetadata, cls) {
    var descriptor = methodMetadata.descriptor, metadataName = methodMetadata.annotationInstance.metadataName;
    if (metadataName == MIDDLEWARE)
        return descriptor.value.call(cls, router);
}
function registerRouter(baseUrl, methods, cls) {
    var map = new Map();
    var router = cls.router;
    methods.forEach(function (methodMetadata) {
        var _a;
        var descriptor = methodMetadata.descriptor, _b = methodMetadata.annotationInstance, __DI_FLAG__ = _b.__DI_FLAG__, url = _b.url, handlers = _b.handlers, metadataName = _b.metadataName;
        var _descriptor = descriptor.value;
        if (metadataName !== RequestMethod[metadataName])
            return callMiddleware(router, methodMetadata, cls);
        if (!map.has(descriptor))
            map.set(descriptor, __DI_FLAG__ === FACTORY ? _descriptor.apply(cls) : _descriptor.bind(cls));
        var params = baseUrl ? [baseUrl] : [];
        typeof url === 'string' ? params[0] = "".concat(baseUrl || '', "/").concat(url).replace(/[\\/]+/g, '/') : url && params.push(url);
        (_a = router[metadataName]).call.apply(_a, __spreadArray([router], params.concat(handlers, map.get(descriptor)), false));
    });
    map.clear();
    return router;
}
var createFactoryRouter = function (cls, baseUrl) {
    var factory = convertToFactory(cls);
    return function () {
        var newCls = factory();
        newCls.router = Router();
        registerRouter(baseUrl, cls.__methods__ || [], newCls);
        return newCls;
    };
};
export var Controller = makeDecorator(CONTROL, function (baseUrl) { return ({ baseUrl: baseUrl }); }, function (cls, meta) {
    setInjectableDef(cls, { token: cls, providedIn: ROOT_SCOPE, factory: createFactoryRouter(cls, meta) });
});
export var Middleware = makeMethodDecorator(MIDDLEWARE);
export var Get = (_a = [
    RequestMethod.get,
    RequestMethod.all,
    RequestMethod.use,
    RequestMethod.put,
    RequestMethod.post,
    RequestMethod.param,
    RequestMethod.delete,
    RequestMethod.options
].map(function (method) { return [makeMethodDecorator(method, props), attachInjectFlag(makeMethodDecorator(method, props), FACTORY)]; }), _b = _a[0], _b[0]), FactoryGet = _b[1], All = (_c = _a[1], _c[0]), FactoryAll = _c[1], Use = (_d = _a[2], _d[0]), FactoryUse = _d[1], Put = (_e = _a[3], _e[0]), FactoryPut = _e[1], Post = (_f = _a[4], _f[0]), FactoryPost = _f[1], Param = (_g = _a[5], _g[0]), FactoryParam = _g[1], Delete = (_h = _a[6], _h[0]), FactoryDelete = _h[1], Options = (_j = _a[7], _j[0]), FactoryOptions = _j[1];
