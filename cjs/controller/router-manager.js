"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouterManager = void 0;
var tslib_1 = require("tslib");
/* eslint-disable no-await-in-loop */
var decorator_1 = require("@hwy-fm/core/platform/decorator");
var di_1 = require("@hwy-fm/di");
var express_1 = tslib_1.__importStar(require("express"));
var lodash_1 = require("lodash");
var constant_1 = require("./constant");
var embedded_1 = require("./embedded");
function type(typeName) {
    return function (obj) { return Object.prototype.toString.call(obj).replace(/\[Object ([^\]]*)\]/ig, '$1').toLowerCase() === typeName; };
}
var typeString = type('string');
var typeObject = type('object');
var replaceUrl = function (url) { return "/".concat(url).replace(/[\\/]+/g, '/'); };
function proxyNext(next) {
    var nextStatus = true;
    return {
        checkValid: function () { return nextStatus; },
        next: function (value) { nextStatus = false; next(value); }
    };
}
var RouterManager = /** @class */ (function () {
    function RouterManager() {
    }
    RouterManager.prototype.checkRouterMethod = function (metadataName) {
        return metadataName === constant_1.RequestMethod[metadataName];
    };
    RouterManager.prototype.createAgent = function (type, cls, method) {
        var _this = this;
        var agent = this.mp.proxyMethod(cls, method);
        var headers = this.getResponseHeaders(type, method);
        return function (req, res, _next) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var _a, next, checkValid, result, error_1;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = proxyNext(_next), next = _a.next, checkValid = _a.checkValid;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, agent(req, res, next)];
                    case 2:
                        result = _b.sent();
                        if (checkValid() && result !== constant_1.DISABLED_WRITE && !res.writableEnded) {
                            headers.forEach(function (header) { return header(res); });
                            (0, lodash_1.isObject)(result) ? res.json(result) : res.end(result);
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _b.sent();
                        next(error_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
    };
    RouterManager.prototype.getResponseHeaders = function (type, methodName) {
        var metadataNames = [constant_1.ResponseHeader.header];
        var headersAnnotations = di_1.reflectCapabilities.getMethodAnnotations(type, methodName, metadataNames);
        return headersAnnotations.map(function (_a) {
            var type = _a.type, key = _a.key;
            return function (res) { var _a; return res.setHeader(key, (_a = res.getHeader(key)) !== null && _a !== void 0 ? _a : type); };
        });
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
        if (name === void 0) { name = constant_1.ExtraMethod.embeddedMiddleware; }
        var embeddedMiddleware = [];
        di_1.reflectCapabilities.getMethodAnnotations(type, method, [name]).forEach(function (_a) {
            var embedded = _a.embedded, args = _a.args;
            if (!embedded)
                return;
            embeddedMiddleware.push(_this.transformEmbedded(embedded, args) || embedded);
        });
        return embeddedMiddleware;
    };
    RouterManager.prototype.transformUrl = function (url) {
        var _this = this;
        var middleware = url;
        if (!middleware)
            return [];
        if (middleware instanceof embedded_1.Embedded)
            middleware = this.transformEmbedded(middleware.embedded, middleware.args);
        if (Array.isArray(middleware))
            middleware = middleware.reduce(function (arr, item) { return tslib_1.__spreadArray(tslib_1.__spreadArray([], arr, true), _this.transformUrl(item), true); }, []);
        if (typeString(middleware))
            middleware = this.formatUrl(middleware);
        return middleware ? [middleware] : [];
    };
    RouterManager.prototype.createRouter = function (type, cls, options) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var map, router, _i, _a, _b, method, _c, url, middleware, metadataName, hashKey;
            var _d;
            return tslib_1.__generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        map = new Map();
                        router = (0, express_1.Router)(options);
                        _i = 0, _a = (_d = type.__methods__) !== null && _d !== void 0 ? _d : [];
                        _e.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 5];
                        _b = _a[_i], method = _b.method, _c = _b.annotationInstance, url = _c.url, middleware = _c.middleware, metadataName = _c.metadataName;
                        hashKey = "".concat(method, "embedded");
                        if (!this.checkRouterMethod(metadataName))
                            return [3 /*break*/, 4];
                        if (!(metadataName === constant_1.RequestMethod.middleware)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.mp.proxyMethod(cls, method)(router)];
                    case 2:
                        _e.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        if (!map.has(method)) {
                            map.set(method, this.createAgent(type, cls, method));
                            map.set(hashKey, (0, lodash_1.flatMapDeep)(this.getEmbeddedMiddleware(type, method)));
                        }
                        (0, lodash_1.get)(router, metadataName).apply(router, tslib_1.__spreadArray(tslib_1.__spreadArray(tslib_1.__spreadArray(tslib_1.__spreadArray([], this.transformUrl(url), true), map.get(hashKey), true), middleware, true), [map.get(method)], false));
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
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var cls, metadata, baseUrl, options, _options, router;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        cls = this.injector.get(controller);
                        metadata = di_1.reflectCapabilities.getAnnotation(controller, constant_1.CONTROLLER);
                        if (!metadata) return [3 /*break*/, 2];
                        baseUrl = metadata.baseUrl, options = metadata.options.options;
                        _options = typeObject(baseUrl) ? baseUrl : options;
                        return [4 /*yield*/, this.createRouter(controller, cls, _options)];
                    case 1:
                        router = _a.sent();
                        Object.defineProperty(cls, '__router__', { value: router, enumerable: false, writable: false });
                        typeString(baseUrl) ? this.app.use(this.formatUrl(baseUrl), router) : this.app.use(router);
                        _a.label = 2;
                    case 2: return [2 /*return*/, cls];
                }
            });
        });
    };
    tslib_1.__decorate([
        (0, di_1.Inject)(express_1.default),
        tslib_1.__metadata("design:type", Function)
    ], RouterManager.prototype, "app", void 0);
    tslib_1.__decorate([
        (0, di_1.Inject)(di_1.Injector),
        tslib_1.__metadata("design:type", di_1.Injector)
    ], RouterManager.prototype, "injector", void 0);
    tslib_1.__decorate([
        (0, di_1.Inject)(di_1.MethodProxy),
        tslib_1.__metadata("design:type", di_1.MethodProxy)
    ], RouterManager.prototype, "mp", void 0);
    tslib_1.__decorate([
        (0, di_1.Inject)(constant_1.FORMAT_URL),
        tslib_1.__metadata("design:type", Function)
    ], RouterManager.prototype, "formatUrl", void 0);
    RouterManager = tslib_1.__decorate([
        (0, di_1.Injectable)(),
        (0, decorator_1.Register)({ provide: constant_1.FORMAT_URL, useValue: replaceUrl })
    ], RouterManager);
    return RouterManager;
}());
exports.RouterManager = RouterManager;
