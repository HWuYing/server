"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuiltIn = void 0;
var tslib_1 = require("tslib");
var decorator_1 = require("../decorator");
var ctx_controller_1 = require("./ctx.controller");
var BuiltIn = /** @class */ (function () {
    function BuiltIn() {
    }
    BuiltIn.__order__ = -Infinity;
    BuiltIn = tslib_1.__decorate([
        (0, decorator_1.ControllerModel)({ controller: [ctx_controller_1.Ctx] })
    ], BuiltIn);
    return BuiltIn;
}());
exports.BuiltIn = BuiltIn;
