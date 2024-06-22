import { __awaiter, __decorate, __metadata, __rest } from "tslib";
/* eslint-disable no-await-in-loop */
import { Inject, Injectable, reflectCapabilities } from '@fm/di';
import { Sequelize } from 'sequelize';
import { BELONGS_TO, BELONGS_TO_MANY, HAS_MANY, HAS_ONE, SYNC, TABLE } from './constant';
import { EntityModel } from './model.eneity';
function getEntity(entity) {
    return entity.__DI_FLAG__ === '__forward__ref__' && typeof entity === 'function' ? entity() : entity;
}
let EntityManager = class EntityManager {
    constructor() {
        this.entityMapping = new Map();
    }
    createAssociation(metaKey, entity) {
        return __awaiter(this, void 0, void 0, function* () {
            const metadata = reflectCapabilities.getAnnotation(entity, metaKey);
            if (!metadata)
                return;
            const { type } = metadata, options = __rest(metadata, ["type"]);
            const model = this.getModel(entity);
            const associationsModel = yield this.createEntity(getEntity(type));
            if (associationsModel) {
                model[metaKey].call(model, associationsModel, options);
            }
        });
    }
    getModel(entity) {
        const { tableName } = reflectCapabilities.getAnnotation(getEntity(entity), TABLE);
        return this.entityMapping.get(tableName);
    }
    createEntity(entity) {
        return __awaiter(this, void 0, void 0, function* () {
            const _a = reflectCapabilities.getAnnotation(entity, TABLE), { tableName } = _a, options = __rest(_a, ["tableName"]);
            if (!this.entityMapping.has(tableName)) {
                const keys = [HAS_ONE, HAS_MANY, BELONGS_TO, BELONGS_TO_MANY];
                const syncMetadata = reflectCapabilities.getAnnotation(entity, SYNC);
                const Model = EntityModel.proxyInit(entity, Object.assign({ modelName: tableName, sequelize: this.sequelize }, options));
                this.entityMapping.set(tableName, Model);
                for (const key of keys)
                    yield this.createAssociation(key, entity);
                if (syncMetadata)
                    yield Model.sync(syncMetadata);
            }
            return this.entityMapping.get(tableName);
        });
    }
};
__decorate([
    Inject(Sequelize),
    __metadata("design:type", Sequelize)
], EntityManager.prototype, "sequelize", void 0);
EntityManager = __decorate([
    Injectable()
], EntityManager);
export { EntityManager };
