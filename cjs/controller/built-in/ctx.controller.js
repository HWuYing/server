"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ctx = void 0;
var tslib_1 = require("tslib");
var di_1 = require("@fm/di");
var express_1 = require("express");
var context_1 = require("../context");
var decorator_1 = require("../decorator");
var Ctx = /** @class */ (function () {
    function Ctx() {
    }
    Ctx.prototype.createCtx = function (router) {
        var _this = this;
        router.use(function (req, res, next) {
            Object.defineProperty(req, '__fmCtx__', { value: new context_1.Context(_this.injector, req, res) });
            next();
        });
    };
    tslib_1.__decorate([
        (0, di_1.Inject)(di_1.Injector),
        tslib_1.__metadata("design:type", di_1.Injector)
    ], Ctx.prototype, "injector", void 0);
    tslib_1.__decorate([
        (0, decorator_1.Middleware)(),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Function]),
        tslib_1.__metadata("design:returntype", void 0)
    ], Ctx.prototype, "createCtx", null);
    Ctx = tslib_1.__decorate([
        (0, decorator_1.Controller)()
    ], Ctx);
    return Ctx;
}());
exports.Ctx = Ctx;
