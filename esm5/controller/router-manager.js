import { __awaiter, __decorate, __generator, __metadata, __spreadArray } from "tslib";
/* eslint-disable no-await-in-loop */
import { Inject, Injectable, Injector, reflectCapabilities } from '@fm/di';
import express, { Router } from 'express';
import { CONTROLLER, RequestMethod } from './constant';
function type(typeName) {
    return function (obj) { return Object.prototype.toString.call(obj).replace(/\[Object ([^\]]*)\]/ig, '$1').toLowerCase() === typeName; };
}
var typeString = type('string');
var typeObject = type('object');
var replaceUrl = function (url) { return "/".concat(url).replace(/[\\/]+/g, '/'); };
var RouterManager = /** @class */ (function () {
    function RouterManager() {
    }
    RouterManager.prototype.excelMethodAnnotations = function (methodAnnotations, ctx, next) {
        return __awaiter(this, void 0, void 0, function () {
            var annotation, nextExcelStatus, customAnnotations, proxyNext, annotationInstance;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nextExcelStatus = false;
                        customAnnotations = __spreadArray([], methodAnnotations, true);
                        proxyNext = function (err) { return (nextExcelStatus = true, next(err)); };
                        _a.label = 1;
                    case 1:
                        if (!(customAnnotations.length && (annotation = customAnnotations.shift()))) return [3 /*break*/, 3];
                        annotationInstance = annotation.annotationInstance;
                        if (annotationInstance.metadataName !== RequestMethod.custom)
                            return [3 /*break*/, 1];
                        return [4 /*yield*/, annotationInstance.hook(annotationInstance, ctx, proxyNext)];
                    case 2:
                        _a.sent();
                        if (nextExcelStatus || ctx.res.headersSent)
                            return [2 /*return*/, false];
                        return [3 /*break*/, 1];
                    case 3: return [2 /*return*/, true];
                }
            });
        });
    };
    RouterManager.prototype.methodParams = function (type, method, agent) {
        var _this = this;
        var annotations = reflectCapabilities.getParamAnnotations(type, method);
        var methodAnnotations = reflectCapabilities.getMethodAnnotations(type, method);
        return function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var ctx;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ctx = req.__fmCtx__;
                        return [4 /*yield*/, this.excelMethodAnnotations(methodAnnotations, ctx, next)];
                    case 1:
                        if (_a.sent()) {
                            return [2 /*return*/, agent.apply(void 0, ctx ? ctx.injectArgs(annotations, req, res, next) : [req, res, next])];
                        }
                        return [2 /*return*/];
                }
            });
        }); };
    };
    RouterManager.prototype.createRouter = function (type, cls, options) {
        return __awaiter(this, void 0, void 0, function () {
            var map, _a, __methods__, router, _loop_1, this_1, _i, __methods__1, methodMetadata;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        map = new Map();
                        _a = type.__methods__, __methods__ = _a === void 0 ? [] : _a;
                        router = Router(options);
                        _loop_1 = function (methodMetadata) {
                            var descriptor, method, _c, url, middleware, metadataName, params;
                            var _d;
                            return __generator(this, function (_e) {
                                switch (_e.label) {
                                    case 0:
                                        descriptor = methodMetadata.descriptor, method = methodMetadata.method, _c = methodMetadata.annotationInstance, url = _c.url, middleware = _c.middleware, metadataName = _c.metadataName;
                                        if (metadataName !== RequestMethod[metadataName] || metadataName === RequestMethod.custom)
                                            return [2 /*return*/, "continue"];
                                        if (!map.has(descriptor)) {
                                            map.set(descriptor, this_1.methodParams(type, method, function () {
                                                var args = [];
                                                for (var _i = 0; _i < arguments.length; _i++) {
                                                    args[_i] = arguments[_i];
                                                }
                                                return descriptor.value.apply(cls, args);
                                            }));
                                        }
                                        if (!(metadataName === RequestMethod.middleware)) return [3 /*break*/, 2];
                                        return [4 /*yield*/, map.get(descriptor)(router)];
                                    case 1:
                                        _e.sent();
                                        return [2 /*return*/, "continue"];
                                    case 2:
                                        params = url ? [typeString(url) ? replaceUrl(url) : url] : [];
                                        (_d = router[metadataName]).call.apply(_d, __spreadArray([router], params.concat.apply(params, __spreadArray(__spreadArray([], middleware, false), [map.get(descriptor)], false)), false));
                                        return [2 /*return*/];
                                }
                            });
                        };
                        this_1 = this;
                        _i = 0, __methods__1 = __methods__;
                        _b.label = 1;
                    case 1:
                        if (!(_i < __methods__1.length)) return [3 /*break*/, 4];
                        methodMetadata = __methods__1[_i];
                        return [5 /*yield**/, _loop_1(methodMetadata)];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4:
                        map.clear();
                        return [2 /*return*/, router];
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
    RouterManager = __decorate([
        Injectable()
    ], RouterManager);
    return RouterManager;
}());
export { RouterManager };
