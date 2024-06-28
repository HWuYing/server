/* eslint-disable max-len */
import { registerProvider } from '@fm/core/platform/decorator';
import { Inject, makeDecorator, makePropDecorator, setInjectableDef } from '@fm/di';
import { ASSOCIATION, BELONGS_TO, BELONGS_TO_MANY, COLUMN, ENTITY, ENTITY_QUEUE, HAS_MANY, HAS_ONE, SYNC, TABLE } from './constant';
import { EntityManager } from './entity-manager';
const columnProps = (options) => (Object.assign({ allowNull: true }, options));
const associationsProps = (relations) => (type, options) => (Object.assign({ type, relations }, options));
function getFactoryEntity(type) {
    registerProvider({ provide: ENTITY_QUEUE, multi: true, useValue: setInjectableDef(type) });
}
export { forwardRef } from '@fm/di';
export const Entity = makeDecorator(ENTITY, undefined, getFactoryEntity);
export const Sync = makeDecorator(SYNC, (options) => (Object.assign({ force: true }, options)));
export const Table = makeDecorator(TABLE, (tableName, options) => (Object.assign({ tableName }, options)));
export const HasOne = makePropDecorator(ASSOCIATION, associationsProps(HAS_ONE));
export const HasMany = makePropDecorator(ASSOCIATION, associationsProps(HAS_MANY));
export const BelongsTo = makePropDecorator(ASSOCIATION, associationsProps(BELONGS_TO));
export const BelongsToMany = makePropDecorator(ASSOCIATION, associationsProps(BELONGS_TO_MANY));
export const PrimaryKey = makePropDecorator(COLUMN, () => columnProps({ primaryKey: true, allowNull: false }));
export const Column = makePropDecorator(COLUMN, (name, options) => columnProps(Object.assign({ name }, options)));
export const Convert = makePropDecorator(COLUMN, (type) => ({ convert: type }));
export const InjectEntity = (entity) => Inject(EntityManager, { transform: (_, m) => m.getModel(entity) });
