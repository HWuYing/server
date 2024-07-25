import { __awaiter, __decorate, __generator, __metadata, __spreadArray } from "tslib";
/* eslint-disable no-await-in-loop */
import { Inject, Injectable, Injector, MethodProxy, reflectCapabilities } from '@hwy-fm/di';
import express, { Router } from 'express';
import { flatMapDeep, get } from 'lodash';
import { CONTROLLER, ExtraMethod, RequestMethod } from './constant';
import { Embedded } from './embedded';
function type(typeName) {
    return function (obj) { return Object.prototype.toString.call(obj).replace(/\[Object ([^\]]*)\]/ig, '$1').toLowerCase() === typeName; };
}
var typeString = type('string');
var typeObject = type('object');
var replaceUrl = function (url) { return "/".concat(url).replace(/[\\/]+/g, '/'); };
var RouterManager = /** @class */ (function () {
    function RouterManager() {
    }
    RouterManager.prototype.checkRouterMethod = function (metadataName) {
        return metadataName !== RequestMethod[metadataName];
    };
    RouterManager.prototype.createAgent = function (metadataName, agent) {
        var _this = this;
        if (metadataName === RequestMethod.middleware)
            return agent;
        return function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, agent(req, res, next)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        next(error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
    };
    RouterManager.prototype.transformEmbedded = function (embedded, args) {
        var _a;
        var _b;
        if (args === void 0) { args = []; }
        if ((_b = embedded.prototype) === null || _b === void 0 ? void 0 : _b.middleware) {
            return (_a = this.injector.get(embedded)).middleware.apply(_a, args);
        }
        return typeof embedded === 'function' ? embedded.apply(void 0, args) : embedded;
    };
    RouterManager.prototype.getEmbeddedMiddleware = function (type, method, name) {
        var _this = this;
        if (name === void 0) { name = ExtraMethod.embeddedMiddleware; }
        var embeddedMiddleware = [];
        reflectCapabilities.getMethodAnnotations(type, method).forEach(function (_a) {
            var _b = _a.annotationInstance, metadataName = _b.metadataName, embedded = _b.embedded, args = _b.args;
            if (metadataName !== name || !embedded)
                return;
            embeddedMiddleware.push(_this.transformEmbedded(embedded, args) || embedded);
        });
        return embeddedMiddleware;
    };
    RouterManager.prototype.transformUrl = function (url) {
        var middleware = url;
        if (!middleware)
            return [];
        if (middleware instanceof Embedded)
            middleware = this.transformEmbedded(middleware.embedded, middleware.args);
        return middleware ? [typeString(middleware) ? replaceUrl(middleware) : middleware] : [];
    };
    RouterManager.prototype.createRouter = function (type, cls, options) {
        return __awaiter(this, void 0, void 0, function () {
            var map, router, _i, _a, _b, method, _c, url, middleware, metadataName, hashKey;
            var _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        map = new Map();
                        router = Router(options);
                        _i = 0, _a = (_d = type.__methods__) !== null && _d !== void 0 ? _d : [];
                        _e.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 5];
                        _b = _a[_i], method = _b.method, _c = _b.annotationInstance, url = _c.url, middleware = _c.middleware, metadataName = _c.metadataName;
                        hashKey = "".concat(method, "embedded");
                        if (this.checkRouterMethod(metadataName))
                            return [3 /*break*/, 4];
                        if (!map.has(method)) {
                            map.set(method, this.createAgent(metadataName, this.mp.proxyMethod(cls, method)));
                            map.set(hashKey, flatMapDeep(this.getEmbeddedMiddleware(type, method)));
                        }
                        if (!(metadataName === RequestMethod.middleware)) return [3 /*break*/, 3];
                        return [4 /*yield*/, map.get(method)(router)];
                    case 2:
                        _e.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        get(router, metadataName).apply(router, __spreadArray(__spreadArray(__spreadArray(__spreadArray([], this.transformUrl(url), true), map.get(hashKey), true), middleware, true), [map.get(method)], false));
                        _e.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 1];
                    case 5: return [2 /*return*/, router];
                }
            });
        });
    };
    RouterManager.prototype.register = function (_module, controller) {
        return __awaiter(this, void 0, void 0, function () {
            var cls, metadata, baseUrl, options, _options, router;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        cls = this.injector.get(controller);
                        metadata = reflectCapabilities.getAnnotation(controller, CONTROLLER);
                        if (!metadata) return [3 /*break*/, 2];
                        baseUrl = metadata.baseUrl, options = metadata.options.options;
                        _options = typeObject(baseUrl) ? baseUrl : options;
                        return [4 /*yield*/, this.createRouter(controller, cls, _options)];
                    case 1:
                        router = _a.sent();
                        Object.defineProperty(cls, '__router__', { value: router, enumerable: false, writable: false });
                        typeString(baseUrl) ? this.app.use(replaceUrl(baseUrl), router) : this.app.use(router);
                        _a.label = 2;
                    case 2: return [2 /*return*/, cls];
                }
            });
        });
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
    return RouterManager;
}());
export { RouterManager };
