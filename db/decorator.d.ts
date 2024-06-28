import { TokenKey, Type } from '@fm/di';
import { BelongsToManyOptions, BelongsToOptions, HasManyOptions, HasOneOptions, InitOptions, ModelAttributes, SyncOptions } from 'sequelize';
type EntityType = TokenKey | (() => TokenKey);
type Through = {
    model: EntityType;
} | EntityType;
type BelongsToManyType = (type: EntityType, options: BelongsToManyOptions | {
    through: Through;
}) => PropertyDecorator;
export { forwardRef } from '@fm/di';
export declare const Entity: () => <TFunction extends (new (...args: any[]) => any) & Type<any>>(target: TFunction) => TFunction;
export declare const Sync: (options?: SyncOptions) => <TFunction extends (new (...args: any[]) => any) & Type<any>>(target: TFunction) => TFunction;
export declare const Table: (tableName: string, options?: InitOptions<import("sequelize").Model<any, any>>) => <TFunction extends (new (...args: any[]) => any) & Type<any>>(target: TFunction) => TFunction;
export declare const HasOne: (type: EntityType, options?: HasOneOptions) => PropertyDecorator;
export declare const HasMany: (type: EntityType, options?: HasManyOptions) => PropertyDecorator;
export declare const BelongsTo: (type: EntityType, options?: BelongsToOptions) => PropertyDecorator;
export declare const BelongsToMany: BelongsToManyType;
export declare const PrimaryKey: () => PropertyDecorator;
export declare const Column: (field: string, options: ModelAttributes<import("sequelize").Model<any, any>, any>) => PropertyDecorator;
export declare const Convert: (type: Type<any>) => PropertyDecorator;
export declare const InjectEntity: (entity: Type<any>) => PropertyDecorator;
