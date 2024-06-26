"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntityManager = void 0;
var tslib_1 = require("tslib");
/* eslint-disable no-await-in-loop */
var di_1 = require("@fm/di");
var lodash_1 = require("lodash");
var sequelize_1 = require("sequelize");
var constant_1 = require("./constant");
function getEntity(entity) {
    return entity.__DI_FLAG__ === '__forward__ref__' && typeof entity === 'function' ? entity() : entity;
}
var EntityManager = /** @class */ (function () {
    function EntityManager() {
        this.treeEntity = new Map();
        this.assignKeys = [constant_1.HAS_ONE, constant_1.HAS_MANY, constant_1.BELONGS_TO, constant_1.BELONGS_TO_MANY];
        this.entityMapping = new Map();
    }
    EntityManager.prototype.properties = function (entity, isMapping) {
        var _this = this;
        if (isMapping === void 0) { isMapping = false; }
        var properties = di_1.reflectCapabilities.properties(entity);
        return Object.keys(properties).reduce(function (propMetadata, key) {
            properties[key].forEach(function (_a) {
                var metadataName = _a.metadataName, options = tslib_1.__rest(_a, ["metadataName"]);
                if (_this.assignKeys.includes(metadataName) !== isMapping)
                    propMetadata[key] = Object.assign(propMetadata[key] || {}, options);
            });
            return propMetadata;
        }, {});
    };
    EntityManager.prototype.addTree = function (entity, entices) {
        var _a;
        if (!this.treeEntity.has(entity)) {
            this.treeEntity.set(entity, tslib_1.__spreadArray([], entices, true));
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
            var _b = propsAnnotations[key], _c = _b.name, name = _c === void 0 ? key : _c, options = tslib_1.__rest(_b, ["name"]);
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
            var _b = this.createAssociationThrough(propsAnnotations[key], entity), type = _b.type, relations = _b.relations, options = tslib_1.__rest(_b, ["type", "relations"]);
            var ModelType = this.getModel(entity);
            var AssociationsModel = this.createEntity(getEntity(type));
            if (constant_1.BELONGS_TO === relations)
                relyList.push(getEntity(type));
            if (AssociationsModel)
                (0, lodash_1.get)(ModelType, relations).call(ModelType, AssociationsModel, options);
        }
        this.addTree(entity, relyList);
    };
    EntityManager.prototype.createEntity = function (entity) {
        var _a = di_1.reflectCapabilities.getAnnotation(entity, constant_1.TABLE), tableName = _a.tableName, options = tslib_1.__rest(_a, ["tableName"]);
        if (!this.entityMapping.has(tableName)) {
            var mapping = this.getEntityDbMapping(entity);
            var tableOptions = tslib_1.__assign({ tableName: tableName }, options);
            var modelType = entity instanceof sequelize_1.Model ? entity.init(mapping, tableOptions) : this.seq.define(tableName, mapping, tableOptions);
            this.entityMapping.set(tableName, modelType);
            this.createAssociation(entity);
        }
        return this.entityMapping.get(tableName);
    };
    EntityManager.prototype.syncEntity = function (entity) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var e, syncMetadata;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        e = getEntity(entity);
                        syncMetadata = di_1.reflectCapabilities.getAnnotation(e, constant_1.SYNC);
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
        var tableName = di_1.reflectCapabilities.getAnnotation(getEntity(entity), constant_1.TABLE).tableName;
        return this.entityMapping.get(tableName);
    };
    EntityManager.prototype.initEntices = function (entices) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var execList, _i, entices_2, entity, _a, execList_1, entity;
            var _this = this;
            return tslib_1.__generator(this, function (_b) {
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
    tslib_1.__decorate([
        (0, di_1.Inject)(sequelize_1.Sequelize),
        tslib_1.__metadata("design:type", sequelize_1.Sequelize)
    ], EntityManager.prototype, "seq", void 0);
    EntityManager = tslib_1.__decorate([
        (0, di_1.Injectable)()
    ], EntityManager);
    return EntityManager;
}());
exports.EntityManager = EntityManager;
