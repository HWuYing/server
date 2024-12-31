import { __awaiter } from "tslib";
import { createRegisterLoader, runtimeInjector } from '@hwy-fm/core/platform/decorator';
import { makeMethodDecorator } from '@hwy-fm/di';
import { Middleware } from '../controller';
import { MIDDLEWARE, PROXY, QUEUE } from './constant';
import { Register } from './register';
let register;
const registerHttpProxy = createRegisterLoader(QUEUE);
runtimeInjector(i => register = i.get(Register));
function httpProxyTypeFn(target, method, descriptor, ...params) {
    const [host, options = {}] = params;
    registerHttpProxy({ target, method, host, pathRewrite: descriptor.value, options });
    descriptor.value = function (...args) {
        return __awaiter(this, void 0, void 0, function* () {
            return register.proxyCall(host, ...args);
        });
    };
}
function httpMiddlewareTypeFn(target, method, descriptor) {
    const originValue = descriptor.value;
    Middleware()(target.prototype, method, descriptor);
    descriptor.value = function (router) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = yield originValue.call(this);
            yield register.createMiddleware(config, router);
        });
    };
}
export const HttpProxy = makeMethodDecorator(PROXY, undefined, httpProxyTypeFn);
export const HttpMiddleware = makeMethodDecorator(MIDDLEWARE, undefined, httpMiddlewareTypeFn);
