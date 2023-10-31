import { __assign } from "tslib";
import { registerProvider } from '@fm/core/platform/decorator';
import { Inject, makeDecorator, makePropDecorator, setInjectableDef } from '@fm/di';
import { BELONGS_TO, BELONGS_TO_MANY, COLUMN, ENTITY, ENTITY_QUEUE, HAS_MANY, HAS_ONE, SYNC } from './constant';
import { EntityManager } from './entity-manager';
var associationsProps = function (type, options) { return (__assign({ type: type }, options)); };
var columnProps = function (options) { return (__assign({ allowNull: true }, options)); };
function getFactoryEntity(type) {
    registerProvider({ provide: ENTITY_QUEUE, multi: true, useValue: setInjectableDef(type) });
}
export { forwardRef } from '@fm/di';
export var Sync = makeDecorator(SYNC, function (options) { return (__assign({ force: true }, options)); });
export var Entity = makeDecorator(ENTITY, function (tableName, options) { return (__assign({ tableName: tableName }, options)); }, getFactoryEntity);
export var HasOne = makeDecorator(HAS_ONE, associationsProps);
export var HasMany = makeDecorator(HAS_MANY, associationsProps);
export var BelongsTo = makeDecorator(BELONGS_TO, associationsProps);
export var BelongsToMany = makeDecorator(BELONGS_TO_MANY, associationsProps);
export var PrimaryKey = makePropDecorator(COLUMN, function () { return columnProps({ primaryKey: true, allowNull: false }); });
export var Column = makePropDecorator(COLUMN, function (type, options) { return columnProps(__assign({ type: type }, options)); });
export var InjectEntity = function (entity) { return Inject(EntityManager, { transform: function (_, m) { return m.getModel(entity); } }); };
