import { ModelAttributes, ModelOptions, Sequelize } from 'sequelize';
export declare const createInjectableModel: (sequelize: Sequelize) => (attributes: ModelAttributes, options: ModelOptions) => <T>(clazz: T) => T;
