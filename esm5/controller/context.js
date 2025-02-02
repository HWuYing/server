import { get } from 'lodash';
import { RouterParams } from './constant';
var Context = /** @class */ (function () {
    function Context(injector, req, res) {
        this.injector = injector;
        this.req = req;
        this.res = res;
    }
    Context.prototype.getObjectByKey = function (obj, _a) {
        var key = _a.key;
        return key ? obj && get(obj, key) : obj;
    };
    Context.prototype.getParamByMetadata = function (metadata, data, next) {
        switch (metadata.metadataName) {
            case RouterParams.next: return next;
            case RouterParams.req: return this.req;
            case RouterParams.res: return this.res;
            case RouterParams.ip: return this.req.ip;
            case RouterParams.body: return this.getObjectByKey(this.req.body, metadata);
            case RouterParams.query: return this.getObjectByKey(this.req.query, metadata);
            case RouterParams.param: return this.getObjectByKey(this.req.params, metadata);
            case RouterParams.headers: return this.getObjectByKey(this.req.headers, metadata);
        }
        return data;
    };
    return Context;
}());
export { Context };
