import { get } from 'lodash';
import { RouterParams } from './constant';
export class Context {
    constructor(injector, req, res) {
        this.injector = injector;
        this.req = req;
        this.res = res;
    }
    getObjectByKey(obj, { key }) {
        return key ? obj && get(obj, key) : obj;
    }
    getParamByMetadata(metadata, data, next) {
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
    }
}
