import { Type } from '@fm/di';
import { BelongsToManyOptions, BelongsToOptions, HasManyOptions, HasOneOptions, ModelAttributes, ModelOptions, SyncOptions, TransactionOptions } from 'sequelize';
import { EntityType } from './entity-manager';
type Through = {
    model: EntityType;
} | EntityType;
type BelongsToManyType = (type: EntityType, options: BelongsToManyOptions | {
    through: Through;
}) => PropertyDecorator;
export { forwardRef } from '@fm/di';
export declare const Sync: (options?: SyncOptions) => ClassDecorator;
export declare const Entity: () => ClassDecorator;
export declare const Table: (tableName: string, options?: ModelOptions<import("sequelize").Model<any, any>>) => ClassDecorator;
export declare const HasOne: (type: EntityType, options?: HasOneOptions) => import("../../di").TargetDecorator;
export declare const HasMany: (type: EntityType, options?: HasManyOptions) => import("../../di").TargetDecorator;
export declare const BelongsTo: (type: EntityType, options?: BelongsToOptions) => import("../../di").TargetDecorator;
export declare const BelongsToMany: BelongsToManyType;
export declare const PrimaryKey: () => import("../../di").TargetDecorator;
export declare const Column: (field: string, options: ModelAttributes<import("sequelize").Model<any, any>, any>) => import("../../di").TargetDecorator;
export declare const Convert: (type: Type<any>) => import("../../di").TargetDecorator;
export declare const Transaction: (options?: TransactionOptions) => MethodDecorator;
export declare const InjectEntity: (entity: EntityType) => import("../../di").TargetDecorator;
