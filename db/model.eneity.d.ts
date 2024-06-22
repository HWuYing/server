import { Type } from '@fm/di';
import { InitOptions, Model } from 'sequelize';
export declare class EntityModel extends Model {
    static getEntityDbMapping(entity: Type<any>): any;
    static proxyInit(entity: Type<any>, options: InitOptions<Model>): any;
}
