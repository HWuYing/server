"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Context = void 0;
var tslib_1 = require("tslib");
var constant_1 = require("./constant");
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
            case constant_1.RouterParams.next: return next;
            case constant_1.RouterParams.req: return this.req;
            case constant_1.RouterParams.res: return this.res;
            case constant_1.RouterParams.ip: return this.req.ip;
            case constant_1.RouterParams.body: return this.getObjectByKey(this.req.body, metadata);
            case constant_1.RouterParams.query: return this.getObjectByKey(this.req.query, metadata);
            case constant_1.RouterParams.params: return this.getObjectByKey(this.req.params, metadata);
            case constant_1.RouterParams.custom: return metadata === null || metadata === void 0 ? void 0 : metadata.transform(data, metadata, this, next);
        }
    };
    Context.prototype.excelAnnotations = function (annotations, next) {
        var result;
        var _annotations = tslib_1.__spreadArray([], annotations, true);
        var annotation;
        while (_annotations.length && (annotation = _annotations.pop())) {
            var metadataName = annotation.metadataName;
            if (metadataName === constant_1.RouterParams[metadataName]) {
                result = this.getParamByMetadata(annotation, result, next);
            }
        }
        return result;
    };
    Context.prototype.injectArgs = function (annotations, _req, _res, next) {
        var _this = this;
        if (!annotations.length)
            return [this.req, this.res, next];
        return annotations.map(function (annotation) { return _this.excelAnnotations(annotation, next); });
    };
    return Context;
}());
exports.Context = Context;
