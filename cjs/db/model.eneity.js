"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntityModel = void 0;
var tslib_1 = require("tslib");
var di_1 = require("@fm/di");
var sequelize_1 = require("sequelize");
var EntityModel = /** @class */ (function (_super) {
    tslib_1.__extends(EntityModel, _super);
    function EntityModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EntityModel.getEntityDbMapping = function (entity) {
        var propsAnnotations = di_1.reflectCapabilities.properties(entity);
        var dbMapping = {};
        Object.keys(propsAnnotations).forEach(function (key) {
            var _a = propsAnnotations[key].reduce(function (att, annotation) { return Object.assign(att, annotation); }, {}), _b = _a.name, name = _b === void 0 ? key : _b, options = tslib_1.__rest(_a, ["name"]);
            dbMapping[name] = options;
        });
        return dbMapping;
    };
    EntityModel.proxyInit = function (entity, options) {
        return (entity instanceof sequelize_1.Model ? entity : sequelize_1.Model).init.call(this, this.getEntityDbMapping(entity), options);
    };
    return EntityModel;
}(sequelize_1.Model));
exports.EntityModel = EntityModel;
