import { Type } from '@fm/di';
import { Model, ModelStatic } from 'sequelize';
export declare class EntityManager {
    private sequelize;
    private entityMapping;
    private getEntityDbMapping;
    private createAssociation;
    getModel(entity: Type<any> | (() => Type<any>)): ModelStatic<Model<any, any>>;
    createEntity(entity: Type<any>): Promise<ModelStatic<Model<any, any>>>;
}
