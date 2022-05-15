import { Injectable } from '@fm/di';
export const createInjectableModel = (sequelize) => (attributes, options) => (clazz) => {
    clazz.init(attributes, { sequelize, ...options });
    return Injectable()(clazz);
};
