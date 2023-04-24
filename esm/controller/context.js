import { RouterParams } from './constant';
export class Context {
    constructor(injector, req, res) {
        this.injector = injector;
        this.req = req;
        this.res = res;
    }
    getObjectByKey(obj, { key }) {
        return key ? obj && obj[key] : obj;
    }
    getParamByMetadata(metadata, data, next) {
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
    }
    excelAnnotations(annotations, next) {
        let result;
        const _annotations = [...annotations];
        let annotation;
        while (_annotations.length && (annotation = _annotations.pop())) {
            const { metadataName } = annotation;
            if (metadataName === RouterParams[metadataName]) {
                result = this.getParamByMetadata(annotation, result, next);
            }
        }
        return result;
    }
    injectArgs(annotations, _req, _res, next) {
        if (!annotations.length)
            return [this.req, this.res, next];
        return annotations.map((annotations) => this.excelAnnotations(annotations, next));
    }
}
