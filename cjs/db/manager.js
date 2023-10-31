"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBManager = void 0;
var tslib_1 = require("tslib");
/* eslint-disable no-await-in-loop */
var decorator_1 = require("@fm/core/platform/decorator");
var di_1 = require("@fm/di");
var sequelize_1 = require("sequelize");
var constant_1 = require("./constant");
var entity_manager_1 = require("./entity-manager");
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
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, ((_a = this.sequelize) === null || _a === void 0 ? void 0 : _a.authenticate())];
                    case 1:
                        _b.sent();
                        console.info('Connection has been established successfully.');
                        return [2 /*return*/];
                }
            });
        });
    };
    DBManager.prototype.register = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _i, _a, entity;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!this.sequelize) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.connection()];
                    case 1:
                        _b.sent();
                        _i = 0, _a = this.injector.get(constant_1.ENTITY_QUEUE) || [];
                        _b.label = 2;
                    case 2:
                        if (!(_i < _a.length)) return [3 /*break*/, 5];
                        entity = _a[_i];
                        return [4 /*yield*/, this.em.createEntity(entity)];
                    case 3:
                        _b.sent();
                        _b.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    tslib_1.__decorate([
        (0, di_1.Inject)(di_1.Injector),
        tslib_1.__metadata("design:type", di_1.Injector)
    ], DBManager.prototype, "injector", void 0);
    tslib_1.__decorate([
        (0, di_1.Inject)(sequelize_1.Sequelize),
        tslib_1.__metadata("design:type", sequelize_1.Sequelize)
    ], DBManager.prototype, "sequelize", void 0);
    tslib_1.__decorate([
        (0, di_1.Inject)(entity_manager_1.EntityManager),
        tslib_1.__metadata("design:type", entity_manager_1.EntityManager)
    ], DBManager.prototype, "em", void 0);
    tslib_1.__decorate([
        (0, decorator_1.Input)(constant_1.DATABASE),
        tslib_1.__metadata("design:type", Object)
    ], DBManager.prototype, "dbConfig", void 0);
    tslib_1.__decorate([
        (0, decorator_1.Prov)(sequelize_1.Sequelize),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", void 0)
    ], DBManager.prototype, "getSequelize", null);
    DBManager = tslib_1.__decorate([
        (0, decorator_1.ApplicationPlugin)()
    ], DBManager);
    return DBManager;
}());
exports.DBManager = DBManager;
