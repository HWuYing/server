import { __rest } from "tslib";
import { reflectCapabilities } from '@fm/di';
import { Model } from 'sequelize';
export class EntityModel extends Model {
    static getEntityDbMapping(entity) {
        const propsAnnotations = reflectCapabilities.properties(entity);
        return Object.keys(propsAnnotations).reduceRight((mapping, key) => {
            const _a = propsAnnotations[key].reduce((att, annotation) => Object.assign(att, annotation), {}), { name = key } = _a, options = __rest(_a, ["name"]);
            return Object.assign(mapping, { [name]: options });
        }, {});
    }
    static proxyInit(entity, options) {
        return (entity instanceof Model ? entity : Model).init.call(this, this.getEntityDbMapping(entity), options);
    }
}
