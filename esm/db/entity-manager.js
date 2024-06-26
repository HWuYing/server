import { __awaiter, __decorate, __metadata, __rest } from "tslib";
/* eslint-disable no-await-in-loop */
import { Inject, Injectable, reflectCapabilities } from '@fm/di';
import { get } from 'lodash';
import { Model, Sequelize } from 'sequelize';
import { BELONGS_TO, BELONGS_TO_MANY, HAS_MANY, HAS_ONE, SYNC, TABLE } from './constant';
function getEntity(entity) {
    return entity.__DI_FLAG__ === '__forward__ref__' && typeof entity === 'function' ? entity() : entity;
}
let EntityManager = class EntityManager {
    constructor() {
        this.treeEntity = new Map();
        this.assignKeys = [HAS_ONE, HAS_MANY, BELONGS_TO, BELONGS_TO_MANY];
        this.entityMapping = new Map();
    }
    properties(entity, isMapping = false) {
        const properties = reflectCapabilities.properties(entity);
        return Object.keys(properties).reduce((propMetadata, key) => {
            properties[key].forEach((_a) => {
                var { metadataName } = _a, options = __rest(_a, ["metadataName"]);
                if (this.assignKeys.includes(metadataName) !== isMapping)
                    propMetadata[key] = Object.assign(propMetadata[key] || {}, options);
            });
            return propMetadata;
        }, {});
    }
    addTree(entity, entices) {
        var _a;
        if (!this.treeEntity.has(entity)) {
            this.treeEntity.set(entity, [...entices]);
        }
        else {
            const list = this.treeEntity.get(entity);
            entices.forEach((entice) => !list.includes(entice) && list.push(entice));
        }
        for (const entice of entices) {
            if ((_a = this.treeEntity.get(entice)) === null || _a === void 0 ? void 0 : _a.includes(entity)) {
                throw new Error('Entity Circular dependency detected');
            }
        }
    }
    getEntityDbMapping(entity) {
        const propsAnnotations = this.properties(entity, true);
        return Object.keys(propsAnnotations).reduceRight((mapping, key) => {
            const _a = propsAnnotations[key], { name = key } = _a, options = __rest(_a, ["name"]);
            return Object.assign(mapping, { [name]: options });
        }, {});
    }
    createAssociationThrough(options, entity) {
        var _a;
        const through = ((_a = options.through) === null || _a === void 0 ? void 0 : _a.model) || options.through;
        if (through && typeof through !== 'string') {
            const throughEntity = getEntity(through);
            const throughModel = this.createEntity(throughEntity);
            this.addTree(throughEntity, [entity, getEntity(options.type)]);
            options.through.model ? options.through.model = throughModel : options.through = throughModel;
        }
        return options;
    }
    createAssociation(entity) {
        const relyList = [];
        const propsAnnotations = this.properties(entity, false);
        for (const key of Object.keys(propsAnnotations)) {
            const _a = this.createAssociationThrough(propsAnnotations[key], entity), { type, relations } = _a, options = __rest(_a, ["type", "relations"]);
            const ModelType = this.getModel(entity);
            const AssociationsModel = this.createEntity(getEntity(type));
            if (BELONGS_TO === relations)
                relyList.push(getEntity(type));
            if (AssociationsModel)
                get(ModelType, relations).call(ModelType, AssociationsModel, options);
        }
        this.addTree(entity, relyList);
    }
    createEntity(entity) {
        const _a = reflectCapabilities.getAnnotation(entity, TABLE), { tableName } = _a, options = __rest(_a, ["tableName"]);
        if (!this.entityMapping.has(tableName)) {
            const mapping = this.getEntityDbMapping(entity);
            const tableOptions = Object.assign({ tableName }, options);
            const modelType = entity instanceof Model ? entity.init(mapping, tableOptions) : this.seq.define(tableName, mapping, tableOptions);
            this.entityMapping.set(tableName, modelType);
            this.createAssociation(entity);
        }
        return this.entityMapping.get(tableName);
    }
    syncEntity(entity) {
        return __awaiter(this, void 0, void 0, function* () {
            const e = getEntity(entity);
            const syncMetadata = reflectCapabilities.getAnnotation(e, SYNC);
            if (syncMetadata)
                yield this.getModel(e).sync(syncMetadata);
        });
    }
    getModel(entity) {
        const { tableName } = reflectCapabilities.getAnnotation(getEntity(entity), TABLE);
        return this.entityMapping.get(tableName);
    }
    initEntices(entices) {
        return __awaiter(this, void 0, void 0, function* () {
            const execList = [];
            for (const entity of entices)
                this.createEntity(entity);
            while (this.treeEntity.size > 0) {
                this.treeEntity.forEach((entices, entity) => {
                    if (!entices.length) {
                        execList.push(entity);
                        this.treeEntity.forEach((value) => value.splice(value.indexOf(entity), 1));
                        this.treeEntity.delete(entity);
                    }
                });
            }
            for (const entity of execList)
                yield this.syncEntity(entity);
        });
    }
};
__decorate([
    Inject(Sequelize),
    __metadata("design:type", Sequelize)
], EntityManager.prototype, "seq", void 0);
EntityManager = __decorate([
    Injectable()
], EntityManager);
export { EntityManager };
