"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntityManager = void 0;
var tslib_1 = require("tslib");
/* eslint-disable no-await-in-loop */
var di_1 = require("@fm/di");
var sequelize_1 = require("sequelize");
var constant_1 = require("./constant");
var model_entity_1 = require("./model.entity");
function getEntity(entity) {
    return entity.__DI_FLAG__ === '__forward__ref__' && typeof entity === 'function' ? entity() : entity;
}
var EntityManager = /** @class */ (function () {
    function EntityManager() {
        this.entityMapping = new Map();
    }
    EntityManager.prototype.createAssociation = function (metaKey, entity) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var metadata, type, options, model, associationsModel;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        metadata = di_1.reflectCapabilities.getAnnotation(entity, metaKey);
                        if (!metadata)
                            return [2 /*return*/];
                        type = metadata.type, options = tslib_1.__rest(metadata, ["type"]);
                        model = this.getModel(entity);
                        return [4 /*yield*/, this.createEntity(getEntity(type))];
                    case 1:
                        associationsModel = _a.sent();
                        if (associationsModel) {
                            model[metaKey].call(model, associationsModel, options);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    EntityManager.prototype.getModel = function (entity) {
        var tableName = di_1.reflectCapabilities.getAnnotation(getEntity(entity), constant_1.TABLE).tableName;
        return this.entityMapping.get(tableName);
    };
    EntityManager.prototype.createEntity = function (entity) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a, tableName, options, keys, syncMetadata, Model_1, _i, keys_1, key;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = di_1.reflectCapabilities.getAnnotation(entity, constant_1.TABLE), tableName = _a.tableName, options = tslib_1.__rest(_a, ["tableName"]);
                        if (!!this.entityMapping.has(tableName)) return [3 /*break*/, 6];
                        keys = [constant_1.HAS_ONE, constant_1.HAS_MANY, constant_1.BELONGS_TO, constant_1.BELONGS_TO_MANY];
                        syncMetadata = di_1.reflectCapabilities.getAnnotation(entity, constant_1.SYNC);
                        Model_1 = model_entity_1.EntityModel.proxyInit(entity, tslib_1.__assign({ modelName: tableName, sequelize: this.sequelize }, options));
                        this.entityMapping.set(tableName, Model_1);
                        _i = 0, keys_1 = keys;
                        _b.label = 1;
                    case 1:
                        if (!(_i < keys_1.length)) return [3 /*break*/, 4];
                        key = keys_1[_i];
                        return [4 /*yield*/, this.createAssociation(key, entity)];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4:
                        if (!syncMetadata) return [3 /*break*/, 6];
                        return [4 /*yield*/, Model_1.sync(syncMetadata)];
                    case 5:
                        _b.sent();
                        _b.label = 6;
                    case 6: return [2 /*return*/, this.entityMapping.get(tableName)];
                }
            });
        });
    };
    tslib_1.__decorate([
        (0, di_1.Inject)(sequelize_1.Sequelize),
        tslib_1.__metadata("design:type", sequelize_1.Sequelize)
    ], EntityManager.prototype, "sequelize", void 0);
    EntityManager = tslib_1.__decorate([
        (0, di_1.Injectable)()
    ], EntityManager);
    return EntityManager;
}());
exports.EntityManager = EntityManager;
