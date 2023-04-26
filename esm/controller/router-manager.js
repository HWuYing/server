import { __awaiter, __decorate, __metadata } from "tslib";
/* eslint-disable no-await-in-loop */
import { Inject, Injectable, Injector, reflectCapabilities } from '@fm/di';
import express, { Router } from 'express';
import { CONTROLLER, RequestMethod } from './constant';
function type(typeName) {
    return (obj) => Object.prototype.toString.call(obj).replace(/\[Object ([^\]]*)\]/ig, '$1').toLowerCase() === typeName;
}
const typeString = type('string');
const typeObject = type('object');
const replaceUrl = (url) => `/${url}`.replace(/[\\/]+/g, '/');
let RouterManager = class RouterManager {
    excelMethodAnnotations(methodAnnotations, ctx, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let annotation;
            let nextExcelStatus = false;
            const customAnnotations = [...methodAnnotations];
            const proxyNext = (err) => (nextExcelStatus = true, next(err));
            while (customAnnotations.length && (annotation = customAnnotations.shift())) {
                const { annotationInstance } = annotation;
                if (annotationInstance.metadataName !== RequestMethod.custom)
                    continue;
                yield annotationInstance.hook(annotationInstance, ctx, proxyNext);
                if (nextExcelStatus || ctx.res.headersSent)
                    return false;
            }
            return true;
        });
    }
    methodParams(type, method, agent) {
        const annotations = reflectCapabilities.getParamAnnotations(type, method);
        const methodAnnotations = reflectCapabilities.getMethodAnnotations(type, method);
        return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { __fmCtx__: ctx } = req;
            if (yield this.excelMethodAnnotations(methodAnnotations, ctx, next)) {
                return agent(...ctx ? ctx.injectArgs(annotations, req, res, next) : [req, res, next]);
            }
        });
    }
    createRouter(type, cls, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const map = new Map();
            const { __methods__ = [] } = type;
            const router = Router(options);
            for (const methodMetadata of __methods__) {
                const { descriptor, method, annotationInstance: { url, middleware, metadataName } } = methodMetadata;
                if (metadataName !== RequestMethod[metadataName] || metadataName === RequestMethod.custom)
                    continue;
                if (!map.has(descriptor)) {
                    map.set(descriptor, this.methodParams(type, method, (...args) => descriptor.value.apply(cls, args)));
                }
                if (metadataName === RequestMethod.middleware) {
                    yield map.get(descriptor)(router);
                    continue;
                }
                const params = url ? [typeString(url) ? replaceUrl(url) : url] : [];
                router[metadataName].call(router, ...params.concat(...middleware, map.get(descriptor)));
            }
            map.clear();
            return router;
        });
    }
    register(_module, controller) {
        return __awaiter(this, void 0, void 0, function* () {
            const cls = this.injector.get(controller);
            const metadata = reflectCapabilities.getAnnotation(controller, CONTROLLER);
            if (metadata) {
                const { baseUrl, options: { options } } = metadata;
                const _options = typeObject(baseUrl) ? baseUrl : options;
                const router = yield this.createRouter(controller, cls, _options);
                Object.defineProperty(cls, '__router__', { value: router, enumerable: false, writable: false });
                typeString(baseUrl) ? this.app.use(replaceUrl(baseUrl), router) : this.app.use(router);
            }
            return cls;
        });
    }
};
__decorate([
    Inject(express),
    __metadata("design:type", Function)
], RouterManager.prototype, "app", void 0);
__decorate([
    Inject(Injector),
    __metadata("design:type", Injector)
], RouterManager.prototype, "injector", void 0);
RouterManager = __decorate([
    Injectable()
], RouterManager);
export { RouterManager };
