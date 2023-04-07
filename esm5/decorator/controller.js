import { convertToFactory, makeDecorator, makeMethodDecorator, setInjectableDef } from '@fm/di';
import { Router } from 'express';
var CONTROL = 'Control';
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
var props = function (url) { return ({ url: url }); };
function createRouter(baseUrl, __methods__, newClazz) {
    var router = Router();
    __methods__.forEach(function (_a) {
        var descriptor = _a.descriptor, _b = _a.annotationInstance, url = _b.url, metadataName = _b.metadataName;
        if (metadataName === RequestMethod[metadataName]) {
            var routeUrl = "".concat(baseUrl, "/").concat(url).replace(/[\\/]+/g, '/');
            var agent = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                return descriptor.value.apply(newClazz, args);
            };
            router[metadataName.toLocaleLowerCase()].call(router, routeUrl, [], agent);
        }
    });
    return router;
}
var createFactoryRouter = function (baseUrl, clazz) {
    var factory = convertToFactory(clazz);
    return function () {
        var newClazz = factory();
        newClazz.router = createRouter(baseUrl, clazz.__methods__ || [], newClazz);
        return newClazz;
    };
};
// eslint-disable-next-line max-len
export var Controller = makeDecorator(CONTROL, function (baseUrl) {
    if (baseUrl === void 0) { baseUrl = ''; }
    return ({ baseUrl: baseUrl });
}, function (injectableType, meta) {
    if (meta === void 0) { meta = ''; }
    setInjectableDef(injectableType, { token: injectableType, providedIn: 'root', factory: createFactoryRouter(meta, injectableType) });
});
export var Post = makeMethodDecorator(RequestMethod.post, props);
export var Get = makeMethodDecorator(RequestMethod.get, props);
export var Delete = makeMethodDecorator(RequestMethod.delete, props);
export var Put = makeMethodDecorator(RequestMethod.put, props);
export var All = makeMethodDecorator(RequestMethod.all, props);
export var Param = makeMethodDecorator(RequestMethod.param, props);
export var Use = makeMethodDecorator(RequestMethod.use, props);
export var Options = makeMethodDecorator(RequestMethod.options, props);
