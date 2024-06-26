import { __assign, __awaiter, __decorate, __generator, __metadata, __rest, __spreadArray } from "tslib";
/* eslint-disable no-await-in-loop */
import { Inject, Injectable, reflectCapabilities } from '@fm/di';
import { get } from 'lodash';
import { Model, Sequelize } from 'sequelize';
import { BELONGS_TO, BELONGS_TO_MANY, HAS_MANY, HAS_ONE, SYNC, TABLE } from './constant';
function getEntity(entity) {
    return entity.__DI_FLAG__ === '__forward__ref__' && typeof entity === 'function' ? entity() : entity;
}
var EntityManager = /** @class */ (function () {
    function EntityManager() {
        this.treeEntity = new Map();
        this.assignKeys = [HAS_ONE, HAS_MANY, BELONGS_TO, BELONGS_TO_MANY];
        this.entityMapping = new Map();
    }
    EntityManager.prototype.properties = function (entity, isMapping) {
        var _this = this;
        if (isMapping === void 0) { isMapping = false; }
        var properties = reflectCapabilities.properties(entity);
        return Object.keys(properties).reduce(function (propMetadata, key) {
            properties[key].forEach(function (_a) {
                var metadataName = _a.metadataName, options = __rest(_a, ["metadataName"]);
                if (_this.assignKeys.includes(metadataName) !== isMapping)
                    propMetadata[key] = Object.assign(propMetadata[key] || {}, options);
            });
            return propMetadata;
        }, {});
    };
    EntityManager.prototype.addTree = function (entity, entices) {
        var _a;
        if (!this.treeEntity.has(entity)) {
            this.treeEntity.set(entity, __spreadArray([], entices, true));
        }
        else {
            var list_1 = this.treeEntity.get(entity);
            entices.forEach(function (entice) { return !list_1.includes(entice) && list_1.push(entice); });
        }
        for (var _i = 0, entices_1 = entices; _i < entices_1.length; _i++) {
            var entice = entices_1[_i];
            if ((_a = this.treeEntity.get(entice)) === null || _a === void 0 ? void 0 : _a.includes(entity)) {
                throw new Error('Entity Circular dependency detected');
            }
        }
    };
    EntityManager.prototype.getEntityDbMapping = function (entity) {
        var propsAnnotations = this.properties(entity, true);
        return Object.keys(propsAnnotations).reduceRight(function (mapping, key) {
            var _a;
            var _b = propsAnnotations[key], _c = _b.name, name = _c === void 0 ? key : _c, options = __rest(_b, ["name"]);
            return Object.assign(mapping, (_a = {}, _a[name] = options, _a));
        }, {});
    };
    EntityManager.prototype.createAssociationThrough = function (options, entity) {
        var _a;
        var through = ((_a = options.through) === null || _a === void 0 ? void 0 : _a.model) || options.through;
        if (through && typeof through !== 'string') {
            var throughEntity = getEntity(through);
            var throughModel = this.createEntity(throughEntity);
            this.addTree(throughEntity, [entity, getEntity(options.type)]);
            options.through.model ? options.through.model = throughModel : options.through = throughModel;
        }
        return options;
    };
    EntityManager.prototype.createAssociation = function (entity) {
        var relyList = [];
        var propsAnnotations = this.properties(entity, false);
        for (var _i = 0, _a = Object.keys(propsAnnotations); _i < _a.length; _i++) {
            var key = _a[_i];
            var _b = this.createAssociationThrough(propsAnnotations[key], entity), type = _b.type, relations = _b.relations, options = __rest(_b, ["type", "relations"]);
            var ModelType = this.getModel(entity);
            var AssociationsModel = this.createEntity(getEntity(type));
            if (BELONGS_TO === relations)
                relyList.push(getEntity(type));
            if (AssociationsModel)
                get(ModelType, relations).call(ModelType, AssociationsModel, options);
        }
        this.addTree(entity, relyList);
    };
    EntityManager.prototype.createEntity = function (entity) {
        var _a = reflectCapabilities.getAnnotation(entity, TABLE), tableName = _a.tableName, options = __rest(_a, ["tableName"]);
        if (!this.entityMapping.has(tableName)) {
            var mapping = this.getEntityDbMapping(entity);
            var tableOptions = __assign({ tableName: tableName }, options);
            var modelType = entity instanceof Model ? entity.init(mapping, tableOptions) : this.seq.define(tableName, mapping, tableOptions);
            this.entityMapping.set(tableName, modelType);
            this.createAssociation(entity);
        }
        return this.entityMapping.get(tableName);
    };
    EntityManager.prototype.syncEntity = function (entity) {
        return __awaiter(this, void 0, void 0, function () {
            var e, syncMetadata;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        e = getEntity(entity);
                        syncMetadata = reflectCapabilities.getAnnotation(e, SYNC);
                        if (!syncMetadata) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.getModel(e).sync(syncMetadata)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    EntityManager.prototype.getModel = function (entity) {
        var tableName = reflectCapabilities.getAnnotation(getEntity(entity), TABLE).tableName;
        return this.entityMapping.get(tableName);
    };
    EntityManager.prototype.initEntices = function (entices) {
        return __awaiter(this, void 0, void 0, function () {
            var execList, _i, entices_2, entity, _a, execList_1, entity;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        execList = [];
                        for (_i = 0, entices_2 = entices; _i < entices_2.length; _i++) {
                            entity = entices_2[_i];
                            this.createEntity(entity);
                        }
                        while (this.treeEntity.size > 0) {
                            this.treeEntity.forEach(function (entices, entity) {
                                if (!entices.length) {
                                    execList.push(entity);
                                    _this.treeEntity.forEach(function (value) { return value.splice(value.indexOf(entity), 1); });
                                    _this.treeEntity.delete(entity);
                                }
                            });
                        }
                        _a = 0, execList_1 = execList;
                        _b.label = 1;
                    case 1:
                        if (!(_a < execList_1.length)) return [3 /*break*/, 4];
                        entity = execList_1[_a];
                        return [4 /*yield*/, this.syncEntity(entity)];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3:
                        _a++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        Inject(Sequelize),
        __metadata("design:type", Sequelize)
    ], EntityManager.prototype, "seq", void 0);
    EntityManager = __decorate([
        Injectable()
    ], EntityManager);
    return EntityManager;
}());
export { EntityManager };
