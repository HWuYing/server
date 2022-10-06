"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataError = void 0;
var tslib_1 = require("tslib");
var DataError = /** @class */ (function (_super) {
    tslib_1.__extends(DataError, _super);
    function DataError(code, message) {
        var _this = _super.call(this, message) || this;
        _this.code = code;
        return _this;
    }
    return DataError;
}(Error));
exports.DataError = DataError;
