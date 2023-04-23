export var RouterParams;
(function (RouterParams) {
    RouterParams["req"] = "req";
    RouterParams["res"] = "res";
    RouterParams["next"] = "next";
    RouterParams["custom"] = "custom";
})(RouterParams || (RouterParams = {}));
export class Context {
    constructor(injector, req, res) {
        this.injector = injector;
        this.req = req;
        this.res = res;
    }
    getParamByMetadata(metadata, data, next) {
        switch (metadata.metadataName) {
            case RouterParams.next: return next;
            case RouterParams.req: return this.req;
            case RouterParams.res: return this.res;
            case RouterParams.custom: return metadata === null || metadata === void 0 ? void 0 : metadata.hook(metadata, data, this, next);
        }
    }
    excelAnnotations(annotations, next) {
        let result;
        const _annotations = [...annotations];
        let annotation;
        while (_annotations.length && (annotation = _annotations.shift())) {
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
