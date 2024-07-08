import { __awaiter, __decorate, __metadata } from "tslib";
/* eslint-disable no-await-in-loop */
import { Inject, Injectable, Injector, MethodProxy, reflectCapabilities } from '@hwy-fm/di';
import express, { Router } from 'express';
import { flatMapDeep, get } from 'lodash';
import { CONTROLLER, ExtraMethod, RequestMethod } from './constant';
function type(typeName) {
    return (obj) => Object.prototype.toString.call(obj).replace(/\[Object ([^\]]*)\]/ig, '$1').toLowerCase() === typeName;
}
const typeString = type('string');
const typeObject = type('object');
const replaceUrl = (url) => `/${url}`.replace(/[\\/]+/g, '/');
let RouterManager = class RouterManager {
    checkRouterMethod(metadataName) {
        return metadataName !== RequestMethod[metadataName];
    }
    createAgent(metadataName, agent) {
        if (metadataName === RequestMethod.middleware)
            return agent;
        return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield agent(req, res, next);
            }
            catch (error) {
                next(error);
            }
        });
    }
    getEmbeddedMiddleware(type, method, name = ExtraMethod.embeddedMiddleware) {
        const embeddedMiddleware = [];
        reflectCapabilities.getMethodAnnotations(type, method).forEach(({ annotationInstance: { metadataName, embedded, args } }) => {
            var _a;
            let middleware;
            if (metadataName !== name || !embedded)
                return;
            if ((_a = embedded.prototype) === null || _a === void 0 ? void 0 : _a.middleware)
                middleware = this.injector.get(embedded).middleware(...args);
            else if (typeof embedded === 'function' && metadataName === ExtraMethod.embeddedMiddleware) {
                middleware = embedded(...args);
            }
            embeddedMiddleware.push(middleware || embedded);
        });
        return embeddedMiddleware;
    }
    createRouter(type, cls, options) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const map = new Map();
            const router = Router(options);
            const suffix = 'embedded';
            for (const { method, annotationInstance: { url, middleware, metadataName } } of (_a = type.__methods__) !== null && _a !== void 0 ? _a : []) {
                if (this.checkRouterMethod(metadataName))
                    continue;
                if (!map.has(method)) {
                    map.set(method, this.createAgent(metadataName, this.mp.proxyMethod(cls, method)));
                    map.set(`${method}${suffix}`, flatMapDeep(this.getEmbeddedMiddleware(type, method)));
                }
                if (metadataName === RequestMethod.middleware) {
                    yield map.get(method)(router);
                    continue;
                }
                const params = url ? [typeString(url) ? replaceUrl(url) : url] : [];
                get(router, metadataName).apply(router, [...params, ...map.get(`${method}${suffix}`), ...middleware, map.get(method)]);
            }
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
