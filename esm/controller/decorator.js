import { makeDecorator, makeMethodDecorator, makeParamDecorator, setInjectableDef } from '@fm/di';
import { CONTROLLER, CONTROLLER_MODULE, RequestMethod, RouterParams } from './constant';
import { ControllerManager } from './manager';
const paramsProps = (key) => ({ key });
const moduleProps = (options) => (Object.assign({}, options));
const controllerProps = (baseUrl, options = {}) => ({ baseUrl, options });
const methodProps = (url, ...middleware) => ({ url, middleware });
export const Controller = makeDecorator(CONTROLLER, controllerProps, setInjectableDef);
export const ControllerModel = makeDecorator(CONTROLLER_MODULE, moduleProps, ControllerManager.getFactoryControlModel);
export const Get = makeMethodDecorator(RequestMethod.get, methodProps);
export const All = makeMethodDecorator(RequestMethod.all, methodProps);
export const Use = makeMethodDecorator(RequestMethod.use, methodProps);
export const Put = makeMethodDecorator(RequestMethod.put, methodProps);
export const Post = makeMethodDecorator(RequestMethod.post, methodProps);
export const Param = makeMethodDecorator(RequestMethod.param, methodProps);
export const Delete = makeMethodDecorator(RequestMethod.delete, methodProps);
export const Options = makeMethodDecorator(RequestMethod.options, methodProps);
export const Middleware = makeMethodDecorator(RequestMethod.middleware, methodProps);
export const CustomerMethod = (hook) => {
    return makeMethodDecorator(RequestMethod.custom, (options) => (Object.assign({ hook }, options)));
};
export const Ip = makeParamDecorator(RouterParams.ip);
export const Req = makeParamDecorator(RouterParams.req);
export const Res = makeParamDecorator(RouterParams.res);
export const Next = makeParamDecorator(RouterParams.next);
export const Body = makeParamDecorator(RouterParams.body, paramsProps);
export const Query = makeParamDecorator(RouterParams.query, paramsProps);
export const Params = makeParamDecorator(RouterParams.params, paramsProps);
export const Headers = makeParamDecorator(RouterParams.headers, paramsProps);
export function CustomParams(transform) {
    return makeParamDecorator(RouterParams.custom, (options) => (Object.assign({ transform }, options)));
}
