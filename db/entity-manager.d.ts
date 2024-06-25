import { Type } from '@fm/di';
import { Model, ModelStatic } from 'sequelize';
type EntityType = Type<any> | (() => Type<any>);
export declare class EntityManager {
    private sequelize;
    private entityMapping;
    private getEntityDbMapping;
    private createAssociation;
    getModel(entity: EntityType): ModelStatic<Model<any, any>>;
    createEntity(entity: Type<any>): Promise<ModelStatic<Model<any, any>>>;
}
export {};
