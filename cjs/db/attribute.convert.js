"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttributeConverter = void 0;
var AttributeConverter = /** @class */ (function () {
    function AttributeConverter() {
    }
    AttributeConverter.prototype.convertToDatabaseColumn = function (value) {
        return value;
    };
    AttributeConverter.prototype.convertToEntityAttribute = function (value) {
        return value;
    };
    return AttributeConverter;
}());
exports.AttributeConverter = AttributeConverter;
