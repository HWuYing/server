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
export { AttributeConverter };
