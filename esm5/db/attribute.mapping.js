import { __decorate, __metadata } from "tslib";
import { Inject, Injectable, Injector } from '@fm/di';
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
    __decorate([
        Inject(Injector),
        __metadata("design:type", Injector)
    ], AttributeMapping.prototype, "injector", void 0);
    AttributeMapping = __decorate([
        Injectable()
    ], AttributeMapping);
    return AttributeMapping;
}());
export { AttributeMapping };
