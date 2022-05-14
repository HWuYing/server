"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createInjectableModel = void 0;
const di_1 = require("@fm/di");
const createInjectableModel = (sequelize) => (attributes, options) => (clazz) => {
    clazz.init(attributes, { sequelize, ...options });
    return (0, di_1.Injectable)()(clazz);
};
exports.createInjectableModel = createInjectableModel;
