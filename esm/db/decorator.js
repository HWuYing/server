/* eslint-disable max-len */
import { registerProvider } from '@fm/core/platform/decorator';
import { Inject, makeDecorator, makePropDecorator, setInjectableDef } from '@fm/di';
import { BELONGS_TO, BELONGS_TO_MANY, COLUMN, ENTITY, ENTITY_QUEUE, HAS_MANY, HAS_ONE, SYNC, TABLE } from './constant';
import { EntityManager } from './entity-manager';
const associationsProps = (type, options) => (Object.assign({ type }, options));
const columnProps = (options) => (Object.assign({ allowNull: true }, options));
function getFactoryEntity(type) {
    registerProvider({ provide: ENTITY_QUEUE, multi: true, useValue: setInjectableDef(type) });
}
export { forwardRef } from '@fm/di';
export const Entity = makeDecorator(ENTITY, undefined, getFactoryEntity);
export const Sync = makeDecorator(SYNC, (options) => (Object.assign({ force: true }, options)));
export const Table = makeDecorator(TABLE, (tableName, options) => (Object.assign({ tableName }, options)));
export const HasOne = makeDecorator(HAS_ONE, associationsProps);
export const HasMany = makeDecorator(HAS_MANY, associationsProps);
export const BelongsTo = makeDecorator(BELONGS_TO, associationsProps);
export const BelongsToMany = makeDecorator(BELONGS_TO_MANY, associationsProps);
export const PrimaryKey = makePropDecorator(COLUMN, () => columnProps({ primaryKey: true, allowNull: false }));
export const Column = makePropDecorator(COLUMN, (name, options) => columnProps(Object.assign({ name }, options)));
export const InjectEntity = (entity) => Inject(EntityManager, { transform: (_, m) => m.getModel(entity) });
