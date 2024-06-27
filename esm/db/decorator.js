/* eslint-disable max-len */
import { registerProvider } from '@fm/core/platform/decorator';
import { Inject, makeDecorator, makePropDecorator, setInjectableDef } from '@fm/di';
import { BELONGS_TO, BELONGS_TO_MANY, COLUMN, CONVERT, ENTITY, ENTITY_QUEUE, HAS_MANY, HAS_ONE, SYNC, TABLE } from './constant';
import { EntityManager } from './entity-manager';
const associationsProps = (relations) => (type, options) => (Object.assign({ type, relations }, options));
const columnProps = (options) => (Object.assign({ allowNull: true }, options));
function getFactoryEntity(type) {
    registerProvider({ provide: ENTITY_QUEUE, multi: true, useValue: setInjectableDef(type) });
}
export { forwardRef } from '@fm/di';
export const Entity = makeDecorator(ENTITY, undefined, getFactoryEntity);
export const Sync = makeDecorator(SYNC, (options) => (Object.assign({ force: true }, options)));
export const Table = makeDecorator(TABLE, (tableName, options) => (Object.assign({ tableName }, options)));
export const HasOne = makePropDecorator(HAS_ONE, associationsProps(HAS_ONE));
export const HasMany = makePropDecorator(HAS_MANY, associationsProps(HAS_MANY));
export const BelongsTo = makePropDecorator(BELONGS_TO, associationsProps(BELONGS_TO));
export const BelongsToMany = makePropDecorator(BELONGS_TO_MANY, associationsProps(BELONGS_TO_MANY));
export const PrimaryKey = makePropDecorator(COLUMN, () => columnProps({ primaryKey: true, allowNull: false }));
export const Column = makePropDecorator(COLUMN, (name, options) => columnProps(Object.assign({ name }, options)));
export const Convert = makePropDecorator(CONVERT, (type) => ({ convert: type }));
;
export const InjectEntity = (entity) => Inject(EntityManager, { transform: (_, m) => m.getModel(entity) });
