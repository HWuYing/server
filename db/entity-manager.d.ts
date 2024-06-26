import { Type } from '@fm/di';
import { Model, ModelAttributes, ModelStatic } from 'sequelize';
type EntityType = Type<any> | (() => Type<any>);
export declare class EntityManager {
    private seq;
    protected throughEntices: Type<any>[];
    protected assignKeys: string[];
    private entityMapping;
    protected properties(entity: Type<any>, isMapping?: boolean): any;
    protected getEntityDbMapping(entity: Type<any>): ModelAttributes;
    protected createAssociationThrough(options: any): any;
    protected createAssociation(entity: Type<any>): void;
    protected createEntity(entity: Type<any>): ModelStatic<Model<any, any>>;
    protected syncEntity(entity: Type<any>): Promise<void>;
    getModel(entity: EntityType): ModelStatic<Model<any, any>>;
    initEntices(entices: Type<any>[]): Promise<void>;
}
export {};
