import { __decorate, __metadata } from "tslib";
import { Injector, Prop } from '@fm/di';
import { Context } from '../context';
import { Controller, Use } from '../decorator';
let Ctx = class Ctx {
    createCtx(req, res, next) {
        Object.defineProperty(req, '__fmCtx__', { value: new Context(this.injector, req, res) });
        next();
    }
};
__decorate([
    Prop(Injector),
    __metadata("design:type", Injector)
], Ctx.prototype, "injector", void 0);
__decorate([
    Use(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", void 0)
], Ctx.prototype, "createCtx", null);
Ctx = __decorate([
    Controller()
], Ctx);
export { Ctx };
