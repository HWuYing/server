import { Type } from '@hwy-fm/di';
import { BelongsToManyOptions, BelongsToOptions, HasManyOptions, HasOneOptions, ModelAttributes, ModelOptions, SyncOptions, TransactionOptions } from 'sequelize';
import { EntityType } from './entity-manager';
type Through = {
    model: EntityType;
} | EntityType;
type BelongsToManyType = (type: EntityType, options: BelongsToManyOptions | {
    through: Through;
}) => PropertyDecorator;
export { forwardRef } from '@hwy-fm/di';
export declare const Sync: (options?: SyncOptions) => import("../../di/decorators").ClassDecorator<any>;
export declare const Entity: () => import("../../di/decorators").ClassDecorator<any>;
export declare const Table: (tableName: string, options?: ModelOptions<import("sequelize").Model<any, any>>) => import("../../di/decorators").ClassDecorator<any>;
export declare const HasOne: (type: EntityType, options?: HasOneOptions) => import("../../di/decorators").TargetDecorator;
export declare const HasMany: (type: EntityType, options?: HasManyOptions) => import("../../di/decorators").TargetDecorator;
export declare const BelongsTo: (type: EntityType, options?: BelongsToOptions) => import("../../di/decorators").TargetDecorator;
export declare const BelongsToMany: BelongsToManyType;
export declare const PrimaryKey: () => import("../../di/decorators").TargetDecorator;
export declare const Column: (field: string, options: ModelAttributes<import("sequelize").Model<any, any>, any>) => import("../../di/decorators").TargetDecorator;
export declare const Convert: (type: Type<any>) => import("../../di/decorators").TargetDecorator;
export declare const Transaction: (options?: TransactionOptions) => MethodDecorator;
export declare const InjectEntity: (entity: EntityType) => import("../../di/decorators").TargetDecorator;
