import { convertToFactory, makeDecorator, makeMethodDecorator, setInjectableDef } from '@fm/di';
import { Router } from 'express';
const CONTROL = 'Control';
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
const props = (url) => ({ url });
function createRouter(baseUrl, __methods__, newClazz) {
    const router = Router();
    __methods__.forEach(({ descriptor, annotationInstance: { url, metadataName } }) => {
        if (metadataName === RequestMethod[metadataName]) {
            const routeUrl = `${baseUrl}/${url}`.replace(/[\\/]+/g, '/');
            const agent = (...args) => descriptor.value.apply(newClazz, args);
            router[metadataName.toLocaleLowerCase()].call(router, routeUrl, [], agent);
        }
    });
    return router;
}
const createFactoryRouter = (baseUrl, clazz) => {
    const factory = convertToFactory(clazz);
    return () => {
        const newClazz = factory();
        newClazz.router = createRouter(baseUrl, clazz.__methods__ || [], newClazz);
        return newClazz;
    };
};
// eslint-disable-next-line max-len
export const Controller = makeDecorator(CONTROL, (baseUrl = '') => ({ baseUrl }), (injectableType, meta = '') => {
    setInjectableDef(injectableType, { token: injectableType, providedIn: 'root', factory: createFactoryRouter(meta, injectableType) });
});
export const Post = makeMethodDecorator(RequestMethod.post, props);
export const Get = makeMethodDecorator(RequestMethod.get, props);
export const Delete = makeMethodDecorator(RequestMethod.delete, props);
export const Put = makeMethodDecorator(RequestMethod.put, props);
export const All = makeMethodDecorator(RequestMethod.all, props);
export const Param = makeMethodDecorator(RequestMethod.param, props);
export const Use = makeMethodDecorator(RequestMethod.use, props);
export const Options = makeMethodDecorator(RequestMethod.options, props);
