"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InjectEntity = exports.Column = exports.PrimaryKey = exports.BelongsToMany = exports.BelongsTo = exports.HasMany = exports.HasOne = exports.Entity = exports.Sync = exports.forwardRef = void 0;
var tslib_1 = require("tslib");
var di_1 = require("@fm/di");
var constant_1 = require("./constant");
var db_manager_1 = require("./db-manager");
var entity_manager_1 = require("./entity-manager");
var associationsProps = function (type, options) { return (tslib_1.__assign({ type: type }, options)); };
var clumnProps = function (options) { return (tslib_1.__assign({ allowNull: true }, options)); };
var di_2 = require("@fm/di");
Object.defineProperty(exports, "forwardRef", { enumerable: true, get: function () { return di_2.forwardRef; } });
exports.Sync = (0, di_1.makeDecorator)(constant_1.SYNC, function (options) { return (tslib_1.__assign({ force: true }, options)); });
exports.Entity = (0, di_1.makeDecorator)(constant_1.ENTITY, function (tableName, options) { return (tslib_1.__assign({ tableName: tableName }, options)); }, db_manager_1.getFactoryEntity);
exports.HasOne = (0, di_1.makeDecorator)(constant_1.HAS_ONE, associationsProps);
exports.HasMany = (0, di_1.makeDecorator)(constant_1.HAS_MANY, associationsProps);
exports.BelongsTo = (0, di_1.makeDecorator)(constant_1.BELONGS_TO, associationsProps);
exports.BelongsToMany = (0, di_1.makeDecorator)(constant_1.BELONGS_TO_MANY, associationsProps);
exports.PrimaryKey = (0, di_1.makePropDecorator)(constant_1.COLUMN, function () { return clumnProps({ primaryKey: true, allowNull: false }); });
exports.Column = (0, di_1.makePropDecorator)(constant_1.COLUMN, function (type, options) { return clumnProps(tslib_1.__assign({ type: type }, options)); });
var InjectEntity = function (entity) { return (0, di_1.Inject)(entity_manager_1.EntityManager, { transform: function (_, m) { return m.getModel(entity); } }); };
exports.InjectEntity = InjectEntity;
