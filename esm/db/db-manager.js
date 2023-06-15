import { __awaiter, __decorate, __metadata, __rest } from "tslib";
/* eslint-disable no-await-in-loop */
import { Inject, Injectable, setInjectableDef } from '@fm/di';
import { Sequelize } from 'sequelize';
import { Input, Prov } from '../platform/decorator.core';
import { DATABASE } from './constant';
import { EntityManager } from './entity-manager';
const entityQueue = [];
export function getFactoryEntity(type) {
    entityQueue.push(setInjectableDef(type));
}
let DBManager = class DBManager {
    getSequelize() {
        if (this.dbConfig) {
            const _a = this.dbConfig, { name, user, password } = _a, options = __rest(_a, ["name", "user", "password"]);
            return new Sequelize(name, user, password, options);
        }
        return null;
    }
    connection() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.sequelize) {
                yield this.sequelize.authenticate();
                console.info('Connection has been established successfully.');
            }
        });
    }
    register() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.connection();
            for (const entity of entityQueue)
                yield this.em.createEntity(entity);
        });
    }
};
__decorate([
    Inject(Sequelize),
    __metadata("design:type", Sequelize)
], DBManager.prototype, "sequelize", void 0);
__decorate([
    Inject(EntityManager),
    __metadata("design:type", EntityManager)
], DBManager.prototype, "em", void 0);
__decorate([
    Input(DATABASE),
    __metadata("design:type", Object)
], DBManager.prototype, "dbConfig", void 0);
__decorate([
    Prov(Sequelize),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DBManager.prototype, "getSequelize", null);
DBManager = __decorate([
    Injectable()
], DBManager);
export { DBManager };
