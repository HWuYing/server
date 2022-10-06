import { __extends } from "tslib";
var DataError = /** @class */ (function (_super) {
    __extends(DataError, _super);
    function DataError(code, message) {
        var _this = _super.call(this, message) || this;
        _this.code = code;
        return _this;
    }
    return DataError;
}(Error));
export { DataError };
