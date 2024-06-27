import { __assign } from "tslib";
/* eslint-disable max-len */
import { registerProvider } from '@fm/core/platform/decorator';
import { Inject, makeDecorator, makePropDecorator, setInjectableDef } from '@fm/di';
import { BELONGS_TO, BELONGS_TO_MANY, COLUMN, CONVERT, ENTITY, ENTITY_QUEUE, HAS_MANY, HAS_ONE, SYNC, TABLE } from './constant';
import { EntityManager } from './entity-manager';
var associationsProps = function (relations) { return function (type, options) { return (__assign({ type: type, relations: relations }, options)); }; };
var columnProps = function (options) { return (__assign({ allowNull: true }, options)); };
function getFactoryEntity(type) {
    registerProvider({ provide: ENTITY_QUEUE, multi: true, useValue: setInjectableDef(type) });
}
export { forwardRef } from '@fm/di';
export var Entity = makeDecorator(ENTITY, undefined, getFactoryEntity);
export var Sync = makeDecorator(SYNC, function (options) { return (__assign({ force: true }, options)); });
export var Table = makeDecorator(TABLE, function (tableName, options) { return (__assign({ tableName: tableName }, options)); });
export var HasOne = makePropDecorator(HAS_ONE, associationsProps(HAS_ONE));
export var HasMany = makePropDecorator(HAS_MANY, associationsProps(HAS_MANY));
export var BelongsTo = makePropDecorator(BELONGS_TO, associationsProps(BELONGS_TO));
export var BelongsToMany = makePropDecorator(BELONGS_TO_MANY, associationsProps(BELONGS_TO_MANY));
export var PrimaryKey = makePropDecorator(COLUMN, function () { return columnProps({ primaryKey: true, allowNull: false }); });
export var Column = makePropDecorator(COLUMN, function (name, options) { return columnProps(__assign({ name: name }, options)); });
export var Convert = makePropDecorator(CONVERT, function (type) { return ({ convert: type }); });
;
export var InjectEntity = function (entity) { return Inject(EntityManager, { transform: function (_, m) { return m.getModel(entity); } }); };
