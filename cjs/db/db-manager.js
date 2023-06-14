"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBManager = exports.getFactoryEntity = void 0;
var tslib_1 = require("tslib");
/* eslint-disable no-await-in-loop */
var di_1 = require("@fm/di");
var sequelize_1 = require("sequelize");
var decorator_core_1 = require("../platform/decorator.core");
var entity_manager_1 = require("./entity-manager");
var entityQueue = [];
function getFactoryEntity(type) {
    entityQueue.push((0, di_1.setInjectableDef)(type));
}
exports.getFactoryEntity = getFactoryEntity;
var DBManager = /** @class */ (function () {
    function DBManager() {
    }
    DBManager.prototype.getSequelize = function () {
        if (this.dbConfig) {
            var _a = this.dbConfig, name_1 = _a.name, user = _a.user, password = _a.password, options = tslib_1.__rest(_a, ["name", "user", "password"]);
            return new sequelize_1.Sequelize(name_1, user, password, options);
        }
        return null;
    };
    DBManager.prototype.connection = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
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
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _i, entityQueue_1, entity;
            return tslib_1.__generator(this, function (_a) {
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
    tslib_1.__decorate([
        (0, di_1.Inject)(sequelize_1.Sequelize),
        tslib_1.__metadata("design:type", sequelize_1.Sequelize)
    ], DBManager.prototype, "sequelize", void 0);
    tslib_1.__decorate([
        (0, di_1.Inject)(entity_manager_1.EntityManager),
        tslib_1.__metadata("design:type", entity_manager_1.EntityManager)
    ], DBManager.prototype, "em", void 0);
    tslib_1.__decorate([
        (0, decorator_core_1.Input)('db'),
        tslib_1.__metadata("design:type", Object)
    ], DBManager.prototype, "dbConfig", void 0);
    tslib_1.__decorate([
        (0, decorator_core_1.Prov)(sequelize_1.Sequelize),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", void 0)
    ], DBManager.prototype, "getSequelize", null);
    DBManager = tslib_1.__decorate([
        (0, di_1.Injectable)()
    ], DBManager);
    return DBManager;
}());
exports.DBManager = DBManager;
