import { __decorate } from "tslib";
import { ControllerModel } from '@fm/server';
import { Ctx } from './ctx.controller';
var BuiltIn = /** @class */ (function () {
    function BuiltIn() {
    }
    BuiltIn.__order__ = -Infinity;
    BuiltIn = __decorate([
        ControllerModel({ controller: [Ctx] })
    ], BuiltIn);
    return BuiltIn;
}());
export { BuiltIn };
