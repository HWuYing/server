import { attachInjectFlag, convertToFactory, makeDecorator, makeMethodDecorator, ROOT_SCOPE, setInjectableDef } from '@fm/di';
import { Router } from 'express';
const CONTROL = 'Control';
const FACTORY = 0b0001;
const MIDDLEWARE = 'MIDDLEWARE';
var RequestMethod;
(function (RequestMethod) {
    RequestMethod["post"] = "post";
    RequestMethod["get"] = "get";
    RequestMethod["delete"] = "delete";
    RequestMethod["put"] = "put";
    RequestMethod["all"] = "all";
    RequestMethod["options"] = "options";
    RequestMethod["param"] = "param";
    RequestMethod["use"] = "use";
})(RequestMethod || (RequestMethod = {}));
const props = (url, ...handlers) => ({ url, handlers });
function callMiddleware(router, methodMetadata, cls) {
    const { descriptor, annotationInstance: { metadataName } } = methodMetadata;
    if (metadataName == MIDDLEWARE)
        return descriptor.value.call(cls, router);
}
function registerRouter(baseUrl, methods, cls) {
    const map = new Map();
    const router = cls.router;
    methods.forEach((methodMetadata) => {
        const { descriptor, annotationInstance: { __DI_FLAG__, url, handlers, metadataName } } = methodMetadata;
        const _descriptor = descriptor.value;
        if (metadataName !== RequestMethod[metadataName])
            return callMiddleware(router, methodMetadata, cls);
        if (!map.has(descriptor))
            map.set(descriptor, __DI_FLAG__ === FACTORY ? _descriptor.apply(cls) : _descriptor.bind(cls));
        const params = baseUrl ? [baseUrl] : [];
        typeof url === 'string' ? params[0] = `${baseUrl || ''}/${url}`.replace(/[\\/]+/g, '/') : url && params.push(url);
        router[metadataName].call(router, ...params.concat(handlers, map.get(descriptor)));
    });
    map.clear();
    return router;
}
const createFactoryRouter = (cls, baseUrl) => {
    const factory = convertToFactory(cls);
    return () => {
        const newCls = factory();
        newCls.router = Router();
        registerRouter(baseUrl, cls.__methods__ || [], newCls);
        return newCls;
    };
};
export const Controller = makeDecorator(CONTROL, (baseUrl) => ({ baseUrl }), (cls, meta) => {
    setInjectableDef(cls, { token: cls, providedIn: ROOT_SCOPE, factory: createFactoryRouter(cls, meta) });
});
export const Middleware = makeMethodDecorator(MIDDLEWARE);
export const [[Get, FactoryGet], [All, FactoryAll], [Use, FactoryUse], [Put, FactoryPut], [Post, FactoryPost], [Param, FactoryParam], [Delete, FactoryDelete], [Options, FactoryOptions]] = [
    RequestMethod.get,
    RequestMethod.all,
    RequestMethod.use,
    RequestMethod.put,
    RequestMethod.post,
    RequestMethod.param,
    RequestMethod.delete,
    RequestMethod.options
].map((method) => [makeMethodDecorator(method, props), attachInjectFlag(makeMethodDecorator(method, props), FACTORY)]);
