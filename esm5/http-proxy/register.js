import { __assign, __awaiter, __decorate, __generator, __metadata, __rest } from "tslib";
/* eslint-disable no-await-in-loop */
import { Inject, Injectable, Injector } from '@hwy-fm/di';
import { DISABLED_WRITE } from '@hwy-fm/server/controller';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { Agent } from 'https';
import { flatMap, get, isPlainObject } from 'lodash';
import { URL } from 'url';
var Register = /** @class */ (function () {
    function Register() {
        this.agent = new Agent({ rejectUnauthorized: false });
        this.middlewareMap = new Map();
    }
    Register.prototype.loadOptions = function () {
        return __awaiter(this, arguments, void 0, function (options) {
            var _a;
            if (options === void 0) { options = {}; }
            return __generator(this, function (_b) {
                if (isPlainObject(options))
                    return [2 /*return*/, options];
                return [2 /*return*/, ((_a = this.injector.get(options)) === null || _a === void 0 ? void 0 : _a.load()) || {}];
            });
        });
    };
    Register.prototype.pathRewrite = function (options, pathname, req) {
        return __awaiter(this, void 0, void 0, function () {
            var host, path, pathRewrite, _a, href, origin, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        host = options.host, path = options.path, pathRewrite = options.pathRewrite;
                        _a = new URL(req.originalUrl || req.url, host), href = _a.href, origin = _a.origin;
                        pathname = href.replace(origin, path);
                        if (!pathRewrite) return [3 /*break*/, 2];
                        return [4 /*yield*/, pathRewrite(pathname, req)];
                    case 1:
                        _b = _c.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        _b = pathname;
                        _c.label = 3;
                    case 3: return [2 /*return*/, _b];
                }
            });
        });
    };
    Register.prototype.createProxyMiddleware = function (element) {
        var _a = element.host, host = _a === void 0 ? '' : _a, _b = element.options, _c = _b === void 0 ? {} : _b, _d = _c.pathRewrite, pathRewrite = _d === void 0 ? null : _d, options = __rest(_c, ["pathRewrite"]);
        if (this.middlewareMap.has(host)) {
            console.error('proxy middleware is', host);
        }
        else {
            var _e = host.match(/^(https?:\/\/[^\\/]+)(.*)/), target = _e[1], _f = _e[2], path = _f === void 0 ? '' : _f;
            this.middlewareMap.set(host, createProxyMiddleware(__assign({ target: target, secure: true, changeOrigin: true, agent: /https/ig.test(host) ? this.agent : undefined, pathRewrite: this.pathRewrite.bind(this, { host: target, path: path, pathRewrite: pathRewrite }) }, options)));
        }
        return this.middlewareMap.get(host);
    };
    Register.prototype.proxyCall = function (host, req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var proxyHandler;
            return __generator(this, function (_a) {
                proxyHandler = this.middlewareMap.get(host);
                proxyHandler(req, res, next);
                return [2 /*return*/, DISABLED_WRITE];
            });
        });
    };
    Register.prototype.createProxy = function (element) {
        return __awaiter(this, void 0, void 0, function () {
            var target, host, pathRewrite, _a, opt, options;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        target = element.target, host = element.host, pathRewrite = element.pathRewrite, _a = element.options, opt = _a === void 0 ? {} : _a;
                        return [4 /*yield*/, this.loadOptions(opt)];
                    case 1:
                        options = _b.sent();
                        this.createProxyMiddleware({
                            host: host,
                            options: __assign(__assign({}, options), { pathRewrite: pathRewrite.bind(this.injector.get(target)) })
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    Register.prototype.createMiddleware = function (config, router) {
        return __awaiter(this, void 0, void 0, function () {
            var defaultMethod, _loop_1, this_1, _i, config_1, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!config)
                            return [2 /*return*/];
                        defaultMethod = 'use';
                        config = flatMap(Array.isArray(config) ? config : [config]);
                        _loop_1 = function (_a) {
                            var _c, proxyApi, element, middleware, _d, _e, _f;
                            var _g;
                            return __generator(this, function (_h) {
                                switch (_h.label) {
                                    case 0:
                                        _c = _a.proxyApi, proxyApi = _c === void 0 ? [] : _c, element = __rest(_a, ["proxyApi"]);
                                        _e = (_d = this_1).createProxyMiddleware;
                                        _f = [__assign({}, element)];
                                        _g = {};
                                        return [4 /*yield*/, this_1.loadOptions(element.options)];
                                    case 1:
                                        middleware = _e.apply(_d, [__assign.apply(void 0, _f.concat([(_g.options = _h.sent(), _g)]))]);
                                        proxyApi.forEach(function (proxyPath) {
                                            var _a = Array.isArray(proxyPath) ? proxyPath : [defaultMethod, proxyPath], method = _a[0], api = _a[1];
                                            get(router, method).apply(router, api === '*' && method === defaultMethod ? [middleware] : [api, middleware]);
                                        });
                                        return [2 /*return*/];
                                }
                            });
                        };
                        this_1 = this;
                        _i = 0, config_1 = config;
                        _b.label = 1;
                    case 1:
                        if (!(_i < config_1.length)) return [3 /*break*/, 4];
                        _a = config_1[_i];
                        return [5 /*yield**/, _loop_1(_a)];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        Inject(Injector),
        __metadata("design:type", Injector)
    ], Register.prototype, "injector", void 0);
    Register = __decorate([
        Injectable()
    ], Register);
    return Register;
}());
export { Register };
