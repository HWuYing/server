import { __awaiter, __decorate, __metadata } from "tslib";
/* eslint-disable no-await-in-loop */
import { ApplicationPlugin } from '@hwy-fm/core/platform/decorator';
import { Inject, Injector } from '@hwy-fm/di';
import { QUEUE } from './constant';
import { Register } from './register';
let ProxyPlugin = class ProxyPlugin {
    register() {
        return __awaiter(this, void 0, void 0, function* () {
            const register = this.injector.get(Register);
            for (const element of this.injector.get(QUEUE) || [])
                yield register.createProxy(element);
        });
    }
};
__decorate([
    Inject(Injector),
    __metadata("design:type", Injector)
], ProxyPlugin.prototype, "injector", void 0);
ProxyPlugin = __decorate([
    ApplicationPlugin()
], ProxyPlugin);
export { ProxyPlugin };
