"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Context = void 0;
var lodash_1 = require("lodash");
var constant_1 = require("./constant");
var Context = /** @class */ (function () {
    function Context(injector, req, res) {
        this.injector = injector;
        this.req = req;
        this.res = res;
    }
    Context.prototype.getObjectByKey = function (obj, _a) {
        var key = _a.key;
        return key ? obj && (0, lodash_1.get)(obj, key) : obj;
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
            case constant_1.RouterParams.headers: return this.getObjectByKey(this.req.headers, metadata);
        }
        return data;
    };
    return Context;
}());
exports.Context = Context;
