import { TokenKey, Type } from '@fm/di';
import { BelongsToManyOptions, BelongsToOptions, HasManyOptions, HasOneOptions, ModelAttributes, ModelOptions, SyncOptions } from 'sequelize';
type EntityType = TokenKey | (() => TokenKey);
type Through = {
    model: EntityType;
} | EntityType;
type EmptyClassDecorator = () => ClassDecorator;
type EmptyPropertyDecorator = () => PropertyDecorator;
type ColumnPropertyDecorator<M, N> = (type: M, options?: N) => PropertyDecorator;
type AssociationsDecorator<T> = ColumnPropertyDecorator<EntityType, T>;
export { forwardRef } from '@fm/di';
export declare const Entity: EmptyClassDecorator;
export declare const Sync: (options?: SyncOptions) => ClassDecorator;
export declare const Table: (tableName: string, options?: ModelOptions) => ClassDecorator;
export declare const HasOne: AssociationsDecorator<HasOneOptions>;
export declare const HasMany: AssociationsDecorator<HasManyOptions>;
export declare const BelongsTo: AssociationsDecorator<BelongsToOptions>;
export declare const BelongsToMany: (type: EntityType, options: BelongsToManyOptions | {
    through: Through;
}) => PropertyDecorator;
export declare const PrimaryKey: EmptyPropertyDecorator;
export declare const Column: (field: string, options: ModelAttributes) => PropertyDecorator;
export declare const Convert: (type: Type<any>) => PropertyDecorator;
export declare const InjectEntity: (entity: Type<any>) => PropertyDecorator;
