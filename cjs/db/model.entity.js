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
        return Object.keys(propsAnnotations).reduceRight(function (mapping, key) {
            var _a;
            var _b = propsAnnotations[key].reduce(function (att, annotation) { return Object.assign(att, annotation); }, {}), _c = _b.name, name = _c === void 0 ? key : _c, options = tslib_1.__rest(_b, ["name"]);
            return Object.assign(mapping, (_a = {}, _a[name] = options, _a));
        }, {});
    };
    EntityModel.proxyInit = function (entity, options) {
        return (entity instanceof sequelize_1.Model ? entity : sequelize_1.Model).init.call(this, this.getEntityDbMapping(entity), options);
    };
    return EntityModel;
}(sequelize_1.Model));
exports.EntityModel = EntityModel;
