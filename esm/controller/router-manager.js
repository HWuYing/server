import { __awaiter, __decorate, __metadata } from "tslib";
/* eslint-disable no-await-in-loop */
import { Inject, Injectable, Injector, MethodProxy, reflectCapabilities } from '@fm/di';
import express, { Router } from 'express';
import { CONTROLLER, RequestMethod } from './constant';
function type(typeName) {
    return (obj) => Object.prototype.toString.call(obj).replace(/\[Object ([^\]]*)\]/ig, '$1').toLowerCase() === typeName;
}
const typeString = type('string');
const typeObject = type('object');
const replaceUrl = (url) => `/${url}`.replace(/[\\/]+/g, '/');
let RouterManager = class RouterManager {
    checkRouterMethod(metadataName) {
        return metadataName !== RequestMethod[metadataName] || metadataName === RequestMethod.requestCustom;
    }
    methodParams(type, method, cls, descriptor) {
        const agent = (...args) => descriptor.value.apply(cls, args);
        const annotations = reflectCapabilities.getParamAnnotations(type, method);
        const methodAnnotations = reflectCapabilities.getMethodAnnotations(type, method)
            .filter(({ annotationInstance: { metadataName } }) => this.checkRouterMethod(metadataName));
        const _agent = this.mp.createAgent(annotations, methodAnnotations, agent);
        return (...args) => __awaiter(this, void 0, void 0, function* () { return new Promise(resolve => _agent(resolve, ...args)); });
    }
    createAgent(metadataName, agent) {
        if (metadataName === RequestMethod.middleware)
            return agent;
        return (req, res, next) => __awaiter(this, void 0, void 0, function* () { return agent(req, res, next); });
    }
    createRouter(type, cls, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const map = new Map();
            const { __methods__ = [] } = type;
            const router = Router(options);
            for (const methodMetadata of __methods__) {
                const { descriptor, method, annotationInstance: { url, middleware, metadataName } } = methodMetadata;
                if (this.checkRouterMethod(metadataName))
                    continue;
                if (!map.has(descriptor)) {
                    map.set(descriptor, this.createAgent(metadataName, this.methodParams(type, method, cls, descriptor)));
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
__decorate([
    Inject(MethodProxy),
    __metadata("design:type", MethodProxy)
], RouterManager.prototype, "mp", void 0);
RouterManager = __decorate([
    Injectable()
], RouterManager);
export { RouterManager };
