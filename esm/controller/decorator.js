/* eslint-disable max-len */
import { createRegisterLoader, runtimeInjector } from '@hwy-fm/core/platform/decorator';
import { makeDecorator, makeMethodDecorator, makeParamDecorator, setInjectableDef } from '@hwy-fm/di';
import { CONTROLLER, CONTROLLER_MODULE, CTX_STORAGE, ExtraMethod, MODULE_QUEUE, RequestMethod, ResponseHeader, RouterParams } from './constant';
let injector;
const registerControlModel = createRegisterLoader(MODULE_QUEUE);
runtimeInjector((i) => injector = i);
function paramsTransform(annotation, data, ...[, , next]) {
    return injector.get(CTX_STORAGE).getStore().getParamByMetadata(annotation, data, next);
}
const moduleProps = (options) => (Object.assign({}, options));
const paramsProps = (key) => ({ key, transform: paramsTransform });
const useProps = (url, ...middleware) => ({ url, middleware });
const methodProps = (url, ...middleware) => ({ url, middleware });
const controllerProps = (baseUrl, options = {}) => ({ baseUrl, options });
export { embedded } from './embedded';
export const Get = makeMethodDecorator(RequestMethod.get, methodProps);
export const All = makeMethodDecorator(RequestMethod.all, methodProps);
export const Use = makeMethodDecorator(RequestMethod.use, useProps);
export const Put = makeMethodDecorator(RequestMethod.put, methodProps);
export const Post = makeMethodDecorator(RequestMethod.post, methodProps);
export const Patch = makeMethodDecorator(RequestMethod.patch, methodProps);
export const Trace = makeMethodDecorator(RequestMethod.trace, methodProps);
export const Delete = makeMethodDecorator(RequestMethod.delete, methodProps);
export const Options = makeMethodDecorator(RequestMethod.options, methodProps);
export const Connect = makeMethodDecorator(RequestMethod.connect, methodProps);
export const Middleware = makeMethodDecorator(RequestMethod.middleware, undefined);
export const createEmbeddedMiddleware = (embedded) => {
    return makeMethodDecorator(ExtraMethod.embeddedMiddleware, (...args) => ({ embedded, args }));
};
export const Header = makeMethodDecorator(ResponseHeader.header, (key, value) => ({ key, value }));
export const ContentType = makeMethodDecorator(ResponseHeader.header, (type) => ({ key: 'Content-Type', type }));
export const Ip = makeParamDecorator(RouterParams.ip, paramsProps);
export const Req = makeParamDecorator(RouterParams.req, paramsProps);
export const Res = makeParamDecorator(RouterParams.res, paramsProps);
export const Next = makeParamDecorator(RouterParams.next, paramsProps);
export const Body = makeParamDecorator(RouterParams.body, paramsProps);
export const Query = makeParamDecorator(RouterParams.query, paramsProps);
export const Params = makeParamDecorator(RouterParams.param, paramsProps);
export const Headers = makeParamDecorator(RouterParams.headers, paramsProps);
export const Controller = makeDecorator(CONTROLLER, controllerProps, setInjectableDef);
export const ControllerModel = makeDecorator(CONTROLLER_MODULE, moduleProps, (type) => registerControlModel(setInjectableDef(type)));
