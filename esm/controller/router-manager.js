import { __decorate, __metadata } from "tslib";
import { Injectable, Injector, Prop, reflectCapabilities } from '@fm/di';
import express, { Router } from 'express';
function type(typeName) {
    return (obj) => Object.prototype.toString.call(obj).replace(/\[Object ([^\]]*)\]/ig, '$1').toLowerCase() === typeName;
}
const typeString = type('string');
const typeObject = type('object');
const replaceUrl = (url) => `/${url}`.replace(/[\\/]+/g, '/');
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
let RouterManager = class RouterManager {
    methodParams(type, method, agent) {
        const annotations = reflectCapabilities.getParamAnnotations(type, method);
        return (req, res, next) => {
            const { __fmCtx__: ctx } = req;
            return agent(...ctx ? ctx.injectArgs(annotations, req, res, next) : [req, res, next]);
        };
    }
    createRouter(type, cls, options) {
        const map = new Map();
        const { __methods__ = [] } = type;
        const router = Router(options);
        __methods__.forEach((methodMetadata) => {
            const { descriptor, method, annotationInstance: { url, middleware, metadataName } } = methodMetadata;
            if (!map.has(descriptor)) {
                map.set(descriptor, this.methodParams(type, method, (...args) => descriptor.value.apply(cls, args)));
            }
            if (metadataName === RequestMethod.middleware)
                return map.get(descriptor)(router);
            if (metadataName === RequestMethod[metadataName]) {
                const params = url ? [typeString(url) ? replaceUrl(url) : url] : [];
                router[metadataName].call(router, ...params.concat(...middleware, map.get(descriptor)));
            }
        });
        map.clear();
        return router;
    }
    register(controller) {
        const cls = this.injector.get(controller);
        const metadata = reflectCapabilities.getAnnotation(controller, 'Control');
        if (metadata) {
            const { baseUrl, options } = metadata;
            const _options = typeObject(baseUrl) ? baseUrl : options;
            const router = this.createRouter(controller, cls, _options);
            Object.defineProperty(cls, '__router__', { value: router, enumerable: false, writable: false });
            typeString(baseUrl) ? this.app.use(replaceUrl(baseUrl), router) : this.app.use(router);
        }
        return cls;
    }
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
export { RouterManager };
