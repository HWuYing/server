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
        var dbMapping = {};
        Object.keys(propsAnnotations).forEach(function (key) {
            var _a = propsAnnotations[key].reduce(function (att, annotation) { return Object.assign(att, annotation); }, {}), _b = _a.name, name = _b === void 0 ? key : _b, options = __rest(_a, ["name"]);
            dbMapping[name] = options;
        });
        return dbMapping;
    };
    EntityModel.proxyInit = function (entity, options) {
        return (entity instanceof Model ? entity : Model).init.call(this, this.getEntityDbMapping(entity), options);
    };
    return EntityModel;
}(Model));
export { EntityModel };
