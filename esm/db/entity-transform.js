import { __decorate, __metadata } from "tslib";
import { Inject, Injectable, Injector } from '@hwy-fm/di';
let EntityTransform = class EntityTransform {
    transform(options) {
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
], EntityTransform.prototype, "injector", void 0);
EntityTransform = __decorate([
    Injectable()
], EntityTransform);
export { EntityTransform };
