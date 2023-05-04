import { __decorate, __metadata } from "tslib";
import { Inject, Injector } from '@fm/di';
import { Router } from 'express';
import { Context } from '../context';
import { Controller, Middleware } from '../decorator';
let Ctx = class Ctx {
    createCtx(router) {
        router.use((req, res, next) => {
            Object.defineProperty(req, '__fmCtx__', { value: new Context(this.injector, req, res) });
            next();
        });
    }
};
__decorate([
    Inject(Injector),
    __metadata("design:type", Injector)
], Ctx.prototype, "injector", void 0);
__decorate([
    Middleware(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Function]),
    __metadata("design:returntype", void 0)
], Ctx.prototype, "createCtx", null);
Ctx = __decorate([
    Controller()
], Ctx);
export { Ctx };
