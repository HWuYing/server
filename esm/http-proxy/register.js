import { __awaiter, __decorate, __metadata, __rest } from "tslib";
/* eslint-disable no-await-in-loop */
import { Inject, Injectable, Injector } from '@hwy-fm/di';
import { DISABLED_WRITE } from '@hwy-fm/server/controller';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { Agent } from 'https';
import { flatMap, get, isPlainObject } from 'lodash';
import { URL } from 'url';
let Register = class Register {
    constructor() {
        this.agent = new Agent({ rejectUnauthorized: false });
        this.middlewareMap = new Map();
    }
    loadOptions() {
        return __awaiter(this, arguments, void 0, function* (options = {}) {
            var _a;
            if (isPlainObject(options))
                return options;
            return ((_a = this.injector.get(options)) === null || _a === void 0 ? void 0 : _a.load()) || {};
        });
    }
    pathRewrite(options, pathname, req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { host, path, pathRewrite } = options;
            const { href, origin } = new URL(req.originalUrl || req.url, host);
            pathname = href.replace(origin, path);
            return pathRewrite ? yield pathRewrite(pathname, req) : pathname;
        });
    }
    createProxyMiddleware(element) {
        const { host = '' } = element, _a = element.options, _b = _a === void 0 ? {} : _a, { pathRewrite = null } = _b, options = __rest(_b, ["pathRewrite"]);
        if (this.middlewareMap.has(host)) {
            console.error('proxy middleware is', host);
        }
        else {
            const [, target, path = ''] = host.match(/^(https?:\/\/[^\\/]+)(.*)/);
            this.middlewareMap.set(host, createProxyMiddleware(Object.assign({ target, secure: true, changeOrigin: true, agent: /https/ig.test(host) ? this.agent : undefined, pathRewrite: this.pathRewrite.bind(this, { host: target, path, pathRewrite }) }, options)));
        }
        return this.middlewareMap.get(host);
    }
    proxyCall(host, req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const proxyHandler = this.middlewareMap.get(host);
            proxyHandler(req, res, next);
            return DISABLED_WRITE;
        });
    }
    createProxy(element) {
        return __awaiter(this, void 0, void 0, function* () {
            const { target, host, pathRewrite, options: opt = {} } = element;
            const options = yield this.loadOptions(opt);
            this.createProxyMiddleware({
                host,
                options: Object.assign(Object.assign({}, options), { pathRewrite: pathRewrite.bind(this.injector.get(target)) })
            });
        });
    }
    createMiddleware(config, router) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!config)
                return;
            const defaultMethod = 'use';
            config = flatMap(Array.isArray(config) ? config : [config]);
            for (let _a of config) {
                const { proxyApi = [] } = _a, element = __rest(_a, ["proxyApi"]);
                const middleware = this.createProxyMiddleware(Object.assign(Object.assign({}, element), { options: yield this.loadOptions(element.options) }));
                proxyApi.forEach((proxyPath) => {
                    const [method, api] = Array.isArray(proxyPath) ? proxyPath : [defaultMethod, proxyPath];
                    get(router, method).apply(router, api === '*' && method === defaultMethod ? [middleware] : [api, middleware]);
                });
            }
        });
    }
};
__decorate([
    Inject(Injector),
    __metadata("design:type", Injector)
], Register.prototype, "injector", void 0);
Register = __decorate([
    Injectable()
], Register);
export { Register };
