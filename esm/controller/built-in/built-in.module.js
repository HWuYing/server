import { __decorate } from "tslib";
import { ControllerModel } from '../decorator';
import { Ctx } from './ctx.controller';
let BuiltIn = class BuiltIn {
};
BuiltIn.__order__ = -Infinity;
BuiltIn = __decorate([
    ControllerModel({ controller: [Ctx] })
], BuiltIn);
export { BuiltIn };
