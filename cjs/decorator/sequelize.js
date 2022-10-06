"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createInjectableModel = void 0;
var tslib_1 = require("tslib");
var di_1 = require("@fm/di");
var createInjectableModel = function (sequelize) { return function (attributes, options) { return function (clazz) {
    clazz.init(attributes, tslib_1.__assign({ sequelize: sequelize }, options));
    return (0, di_1.Injectable)()(clazz);
}; }; };
exports.createInjectableModel = createInjectableModel;
