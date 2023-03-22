"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Options = exports.Use = exports.Param = exports.All = exports.Put = exports.Delete = exports.Get = exports.Post = exports.Controller = void 0;
var di_1 = require("@fm/di");
var express_1 = require("express");
var CONTROLL = 'Controll';
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
var createFactoryRouter = function (baseUrl, clazz) {
    var factory = (0, di_1.convertToFactory)(clazz);
    return function () {
        var newClazz = factory();
        var router = (0, express_1.Router)();
        var _a = clazz.__methods__, __methods__ = _a === void 0 ? [] : _a;
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
    };
};
// eslint-disable-next-line max-len
exports.Controller = (0, di_1.makeDecorator)(CONTROLL, function (baseUrl) {
    if (baseUrl === void 0) { baseUrl = ''; }
    return ({ baseUrl: baseUrl });
}, function (injectableType, meta) {
    if (meta === void 0) { meta = ''; }
    (0, di_1.setInjectableDef)(injectableType, { token: injectableType, providedIn: 'root', factory: createFactoryRouter(meta, injectableType) });
});
exports.Post = (0, di_1.makeMethodDecorator)(RequestMethod.post, props);
exports.Get = (0, di_1.makeMethodDecorator)(RequestMethod.get, props);
exports.Delete = (0, di_1.makeMethodDecorator)(RequestMethod.delete, props);
exports.Put = (0, di_1.makeMethodDecorator)(RequestMethod.put, props);
exports.All = (0, di_1.makeMethodDecorator)(RequestMethod.all, props);
exports.Param = (0, di_1.makeMethodDecorator)(RequestMethod.param, props);
exports.Use = (0, di_1.makeMethodDecorator)(RequestMethod.use, props);
exports.Options = (0, di_1.makeMethodDecorator)(RequestMethod.options, props);
