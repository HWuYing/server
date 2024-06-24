"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InjectEntity = exports.Column = exports.PrimaryKey = exports.BelongsToMany = exports.BelongsTo = exports.HasMany = exports.HasOne = exports.Table = exports.Sync = exports.Entity = exports.forwardRef = void 0;
var tslib_1 = require("tslib");
/* eslint-disable max-len */
var decorator_1 = require("@fm/core/platform/decorator");
var di_1 = require("@fm/di");
var constant_1 = require("./constant");
var entity_manager_1 = require("./entity-manager");
var associationsProps = function (type, options) { return (tslib_1.__assign({ type: type }, options)); };
var columnProps = function (options) { return (tslib_1.__assign({ allowNull: true }, options)); };
function getFactoryEntity(type) {
    (0, decorator_1.registerProvider)({ provide: constant_1.ENTITY_QUEUE, multi: true, useValue: (0, di_1.setInjectableDef)(type) });
}
var di_2 = require("@fm/di");
Object.defineProperty(exports, "forwardRef", { enumerable: true, get: function () { return di_2.forwardRef; } });
exports.Entity = (0, di_1.makeDecorator)(constant_1.ENTITY, undefined, getFactoryEntity);
exports.Sync = (0, di_1.makeDecorator)(constant_1.SYNC, function (options) { return (tslib_1.__assign({ force: true }, options)); });
exports.Table = (0, di_1.makeDecorator)(constant_1.TABLE, function (tableName, options) { return (tslib_1.__assign({ tableName: tableName }, options)); });
exports.HasOne = (0, di_1.makeDecorator)(constant_1.HAS_ONE, associationsProps);
exports.HasMany = (0, di_1.makeDecorator)(constant_1.HAS_MANY, associationsProps);
exports.BelongsTo = (0, di_1.makeDecorator)(constant_1.BELONGS_TO, associationsProps);
exports.BelongsToMany = (0, di_1.makeDecorator)(constant_1.BELONGS_TO_MANY, associationsProps);
exports.PrimaryKey = (0, di_1.makePropDecorator)(constant_1.COLUMN, function () { return columnProps({ primaryKey: true, allowNull: false }); });
exports.Column = (0, di_1.makePropDecorator)(constant_1.COLUMN, function (name, options) { return columnProps(tslib_1.__assign({ name: name }, options)); });
var InjectEntity = function (entity) { return (0, di_1.Inject)(entity_manager_1.EntityManager, { transform: function (_, m) { return m.getModel(entity); } }); };
exports.InjectEntity = InjectEntity;
