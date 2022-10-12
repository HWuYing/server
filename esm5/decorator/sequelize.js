import { __assign } from "tslib";
import { Injectable } from '@fm/di';
export var createInjectableModel = function (sequelize) { return function (attributes, options) { return function (clazz) {
    clazz.init(attributes, __assign({ sequelize: sequelize }, options));
    return Injectable()(clazz);
}; }; };
