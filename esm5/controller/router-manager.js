import { __decorate, __metadata, __spreadArray } from "tslib";
import { Injectable, Injector, Prop, reflectCapabilities } from '@fm/di';
import express, { Router } from 'express';
function type(typeName) {
    return function (obj) { return Object.prototype.toString.call(obj).replace(/\[Object ([^\]]*)\]/ig, '$1').toLowerCase() === typeName; };
}
var typeString = type('string');
var typeObject = type('object');
var replaceUrl = function (url) { return "/".concat(url).replace(/[\\/]+/g, '/'); };
export var RequestMethod;
(function (RequestMethod) {
    RequestMethod["post"] = "post";
    RequestMethod["get"] = "get";
    RequestMethod["delete"] = "delete";
    RequestMethod["put"] = "put";
    RequestMethod["all"] = "all";
    RequestMethod["options"] = "options";
    RequestMethod["param"] = "param";
    RequestMethod["use"] = "use";
    RequestMethod["middleware"] = "middleware";
})(RequestMethod || (RequestMethod = {}));
var RouterManager = /** @class */ (function () {
    function RouterManager() {
    }
    RouterManager.prototype.methodParams = function (type, method, agent) {
        var annotations = reflectCapabilities.getParamAnnotations(type, method);
        return function (req, res, next) {
            var ctx = req.__fmCtx__;
            return agent.apply(void 0, ctx ? ctx.injectArgs(annotations, req, res, next) : [req, res, next]);
        };
    };
    RouterManager.prototype.createRouter = function (type, cls, options) {
        var _this = this;
        var map = new Map();
        var _a = type.__methods__, __methods__ = _a === void 0 ? [] : _a;
        var router = Router(options);
        __methods__.forEach(function (methodMetadata) {
            var _a;
            var descriptor = methodMetadata.descriptor, method = methodMetadata.method, _b = methodMetadata.annotationInstance, url = _b.url, middleware = _b.middleware, metadataName = _b.metadataName;
            if (!map.has(descriptor)) {
                map.set(descriptor, _this.methodParams(type, method, function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    return descriptor.value.apply(cls, args);
                }));
            }
            if (metadataName === RequestMethod.middleware)
                return map.get(descriptor)(router);
            if (metadataName === RequestMethod[metadataName]) {
                var params = url ? [typeString(url) ? replaceUrl(url) : url] : [];
                (_a = router[metadataName]).call.apply(_a, __spreadArray([router], params.concat.apply(params, __spreadArray(__spreadArray([], middleware, false), [map.get(descriptor)], false)), false));
            }
        });
        map.clear();
        return router;
    };
    RouterManager.prototype.register = function (controller) {
        var cls = this.injector.get(controller);
        var metadata = reflectCapabilities.getAnnotation(controller, 'Control');
        if (metadata) {
            var baseUrl = metadata.baseUrl, options = metadata.options;
            var _options = typeObject(baseUrl) ? baseUrl : options;
            var router = this.createRouter(controller, cls, _options);
            Object.defineProperty(cls, '__router__', { value: router, enumerable: false, writable: false });
            typeString(baseUrl) ? this.app.use(replaceUrl(baseUrl), router) : this.app.use(router);
        }
        return cls;
    };
    __decorate([
        Prop(express),
        __metadata("design:type", Function)
    ], RouterManager.prototype, "app", void 0);
    __decorate([
        Prop(Injector),
        __metadata("design:type", Injector)
    ], RouterManager.prototype, "injector", void 0);
    RouterManager = __decorate([
        Injectable()
    ], RouterManager);
    return RouterManager;
}());
export { RouterManager };
