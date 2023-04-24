import { __spreadArray } from "tslib";
import { RouterParams } from './constant';
var Context = /** @class */ (function () {
    function Context(injector, req, res) {
        this.injector = injector;
        this.req = req;
        this.res = res;
    }
    Context.prototype.getObjectByKey = function (obj, _a) {
        var key = _a.key;
        return key ? obj && obj[key] : obj;
    };
    Context.prototype.getParamByMetadata = function (metadata, data, next) {
        switch (metadata.metadataName) {
            case RouterParams.next: return next;
            case RouterParams.req: return this.req;
            case RouterParams.res: return this.res;
            case RouterParams.ip: return this.req.ip;
            case RouterParams.body: return this.getObjectByKey(this.req.body, metadata);
            case RouterParams.query: return this.getObjectByKey(this.req.query, metadata);
            case RouterParams.params: return this.getObjectByKey(this.req.params, metadata);
            case RouterParams.custom: return metadata === null || metadata === void 0 ? void 0 : metadata.transform(metadata, data, this, next);
        }
    };
    Context.prototype.excelAnnotations = function (annotations, next) {
        var result;
        var _annotations = __spreadArray([], annotations, true);
        var annotation;
        while (_annotations.length && (annotation = _annotations.pop())) {
            var metadataName = annotation.metadataName;
            if (metadataName === RouterParams[metadataName]) {
                result = this.getParamByMetadata(annotation, result, next);
            }
        }
        return result;
    };
    Context.prototype.injectArgs = function (annotations, _req, _res, next) {
        var _this = this;
        if (!annotations.length)
            return [this.req, this.res, next];
        return annotations.map(function (annotations) { return _this.excelAnnotations(annotations, next); });
    };
    return Context;
}());
export { Context };
