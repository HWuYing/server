"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttributeMapping = void 0;
var tslib_1 = require("tslib");
var di_1 = require("@fm/di");
var AttributeMapping = /** @class */ (function () {
    function AttributeMapping() {
    }
    AttributeMapping.prototype.attribute = function (options) {
        return this.convert(options);
    };
    AttributeMapping.prototype.convert = function (options) {
        var name = options.name, convert = options.convert;
        if (convert) {
            var convertType_1 = this.injector.get(convert);
            Object.assign(options, {
                set: function (value) {
                    this.setDataValue(name, convertType_1.convertToDatabaseColumn(value));
                },
                get: function () {
                    return convertType_1.convertToEntityAttribute(this.getDataValue(name));
                }
            });
        }
        return options;
    };
    tslib_1.__decorate([
        (0, di_1.Inject)(di_1.Injector),
        tslib_1.__metadata("design:type", di_1.Injector)
    ], AttributeMapping.prototype, "injector", void 0);
    AttributeMapping = tslib_1.__decorate([
        (0, di_1.Injectable)()
    ], AttributeMapping);
    return AttributeMapping;
}());
exports.AttributeMapping = AttributeMapping;
