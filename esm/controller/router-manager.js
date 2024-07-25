import { __awaiter, __decorate, __metadata } from "tslib";
/* eslint-disable no-await-in-loop */
import { Inject, Injectable, Injector, MethodProxy, reflectCapabilities } from '@hwy-fm/di';
import express, { Router } from 'express';
import { flatMapDeep, get } from 'lodash';
import { CONTROLLER, ExtraMethod, RequestMethod } from './constant';
import { Embedded } from './embedded';
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
    transformEmbedded(embedded, args = []) {
        var _a;
        if ((_a = embedded.prototype) === null || _a === void 0 ? void 0 : _a.middleware) {
            return this.injector.get(embedded).middleware(...args);
        }
        return typeof embedded === 'function' ? embedded(...args) : embedded;
    }
    getEmbeddedMiddleware(type, method, name = ExtraMethod.embeddedMiddleware) {
        const embeddedMiddleware = [];
        reflectCapabilities.getMethodAnnotations(type, method).forEach(({ annotationInstance: { metadataName, embedded, args } }) => {
            if (metadataName !== name || !embedded)
                return;
            embeddedMiddleware.push(this.transformEmbedded(embedded, args) || embedded);
        });
        return embeddedMiddleware;
    }
    transformUrl(url) {
        let middleware = url;
        if (!middleware)
            return [];
        if (middleware instanceof Embedded)
            middleware = this.transformEmbedded(middleware.embedded, middleware.args);
        return middleware ? [typeString(middleware) ? replaceUrl(middleware) : middleware] : [];
    }
    createRouter(type, cls, options) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const map = new Map();
            const router = Router(options);
            for (const { method, annotationInstance: { url, middleware, metadataName } } of (_a = type.__methods__) !== null && _a !== void 0 ? _a : []) {
                const hashKey = `${method}embedded`;
                if (this.checkRouterMethod(metadataName))
                    continue;
                if (!map.has(method)) {
                    map.set(method, this.createAgent(metadataName, this.mp.proxyMethod(cls, method)));
                    map.set(hashKey, flatMapDeep(this.getEmbeddedMiddleware(type, method)));
                }
                if (metadataName === RequestMethod.middleware) {
                    yield map.get(method)(router);
                    continue;
                }
                get(router, metadataName).apply(router, [...this.transformUrl(url), ...map.get(hashKey), ...middleware, map.get(method)]);
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
