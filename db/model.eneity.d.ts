import { Type } from '@fm/di';
import { InitOptions, Model, ModelAttributes } from 'sequelize';
export declare class EntityModel extends Model {
    static getEntityDbMapping(entity: Type<any>): Record<string, ModelAttributes<Model<any, any>, any>> & {
        [x: number]: any;
    };
    static proxyInit(entity: Type<any>, options: InitOptions<Model>): any;
}
