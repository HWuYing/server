import { __decorate, __metadata } from "tslib";
import { Inject, Injectable, Injector } from '@fm/di';
let AttributeMapping = class AttributeMapping {
    attribute(options) {
        return this.convert(options);
    }
    convert(options) {
        const { name, convert } = options;
        if (convert) {
            const convertType = this.injector.get(convert);
            Object.assign(options, {
                set: function (value) {
                    this.setDataValue(name, convertType.convertToDatabaseColumn(value));
                },
                get: function () {
                    return convertType.convertToEntityAttribute(this.getDataValue(name));
                }
            });
        }
        return options;
    }
};
__decorate([
    Inject(Injector),
    __metadata("design:type", Injector)
], AttributeMapping.prototype, "injector", void 0);
AttributeMapping = __decorate([
    Injectable()
], AttributeMapping);
export { AttributeMapping };
