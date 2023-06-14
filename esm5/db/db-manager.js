import { __awaiter, __decorate, __generator, __metadata, __rest } from "tslib";
/* eslint-disable no-await-in-loop */
import { Inject, Injectable, setInjectableDef } from '@fm/di';
import { Sequelize } from 'sequelize';
import { Input, Prov } from '../platform/decorator.core';
import { EntityManager } from './entity-manager';
var entityQueue = [];
export function getFactoryEntity(type) {
    entityQueue.push(setInjectableDef(type));
}
var DBManager = /** @class */ (function () {
    function DBManager() {
    }
    DBManager.prototype.getSequelize = function () {
        if (this.dbConfig) {
            var _a = this.dbConfig, name_1 = _a.name, user = _a.user, password = _a.password, options = __rest(_a, ["name", "user", "password"]);
            return new Sequelize(name_1, user, password, options);
        }
        return null;
    };
    DBManager.prototype.connection = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.sequelize) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.sequelize.authenticate()];
                    case 1:
                        _a.sent();
                        console.info('Connection has been established successfully.');
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    DBManager.prototype.register = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _i, entityQueue_1, entity;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.connection()];
                    case 1:
                        _a.sent();
                        _i = 0, entityQueue_1 = entityQueue;
                        _a.label = 2;
                    case 2:
                        if (!(_i < entityQueue_1.length)) return [3 /*break*/, 5];
                        entity = entityQueue_1[_i];
                        return [4 /*yield*/, this.em.createEntity(entity)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5: return [2 /*return*/];
                }
            });
        });
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
        Input('db'),
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
    return DBManager;
}());
export { DBManager };
