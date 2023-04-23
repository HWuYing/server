"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Context = exports.RouterParams = void 0;
var tslib_1 = require("tslib");
var RouterParams;
(function (RouterParams) {
    RouterParams["req"] = "req";
    RouterParams["res"] = "res";
    RouterParams["next"] = "next";
    RouterParams["custom"] = "custom";
})(RouterParams = exports.RouterParams || (exports.RouterParams = {}));
var Context = /** @class */ (function () {
    function Context(injector, req, res) {
        this.injector = injector;
        this.req = req;
        this.res = res;
    }
    Context.prototype.getParamByMetadata = function (metadata, data, next) {
        switch (metadata.metadataName) {
            case RouterParams.next: return next;
            case RouterParams.req: return this.req;
            case RouterParams.res: return this.res;
            case RouterParams.custom: return metadata === null || metadata === void 0 ? void 0 : metadata.hook(metadata, data, this, next);
        }
    };
    Context.prototype.excelAnnotations = function (annotations, next) {
        var result;
        var _annotations = tslib_1.__spreadArray([], annotations, true);
        var annotation;
        while (_annotations.length && (annotation = _annotations.shift())) {
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
exports.Context = Context;
