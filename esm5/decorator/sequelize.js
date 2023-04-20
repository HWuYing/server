import { __assign } from "tslib";
import { setInjectableDef } from '@fm/di';
export var createInjectableModel = function (sequelize) { return function (attributes, options) { return function (clazz) {
    clazz.init(attributes, __assign({ sequelize: sequelize }, options));
    return setInjectableDef(clazz);
}; }; };
