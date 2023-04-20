import { setInjectableDef } from '@fm/di';
export const createInjectableModel = (sequelize) => (attributes, options) => (clazz) => {
    clazz.init(attributes, Object.assign({ sequelize }, options));
    return setInjectableDef(clazz);
};
