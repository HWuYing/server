import { Type } from '@fm/di';
import { BelongsToManyOptions, BelongsToOptions, HasManyOptions, HasOneOptions, ModelAttributes, ModelOptions, SyncOptions } from 'sequelize';
import { EntityType } from './entity-manager';
type Through = {
    model: EntityType;
} | EntityType;
type BelongsToManyType = (type: EntityType, options: BelongsToManyOptions | {
    through: Through;
}) => PropertyDecorator;
export { forwardRef } from '@fm/di';
export declare const Entity: () => ClassDecorator;
export declare const Sync: (options?: SyncOptions) => ClassDecorator;
export declare const Table: (tableName: string, options?: ModelOptions<import("sequelize").Model<any, any>>) => ClassDecorator;
export declare const HasOne: (type: EntityType, options?: HasOneOptions) => ParameterDecorator & PropertyDecorator;
export declare const HasMany: (type: EntityType, options?: HasManyOptions) => ParameterDecorator & PropertyDecorator;
export declare const BelongsTo: (type: EntityType, options?: BelongsToOptions) => ParameterDecorator & PropertyDecorator;
export declare const BelongsToMany: BelongsToManyType;
export declare const PrimaryKey: () => ParameterDecorator & PropertyDecorator;
export declare const Column: (field: string, options: ModelAttributes<import("sequelize").Model<any, any>, any>) => ParameterDecorator & PropertyDecorator;
export declare const Convert: (type: Type<any>) => ParameterDecorator & PropertyDecorator;
export declare const InjectEntity: (entity: EntityType) => ParameterDecorator & PropertyDecorator;
