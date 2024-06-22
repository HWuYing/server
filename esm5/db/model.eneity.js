import { __extends, __rest } from "tslib";
import { reflectCapabilities } from '@fm/di';
import { Model } from 'sequelize';
var EntityModel = /** @class */ (function (_super) {
    __extends(EntityModel, _super);
    function EntityModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EntityModel.getEntityDbMapping = function (entity) {
        var propsAnnotations = reflectCapabilities.properties(entity);
        return Object.keys(propsAnnotations).reduceRight(function (mapping, key) {
            var _a;
            var _b = propsAnnotations[key].reduce(function (att, annotation) { return Object.assign(att, annotation); }, {}), _c = _b.name, name = _c === void 0 ? key : _c, options = __rest(_b, ["name"]);
            return Object.assign(mapping, (_a = {}, _a[name] = options, _a));
        }, {});
    };
    EntityModel.proxyInit = function (entity, options) {
        return (entity instanceof Model ? entity : Model).init.call(this, this.getEntityDbMapping(entity), options);
    };
    return EntityModel;
}(Model));
export { EntityModel };
