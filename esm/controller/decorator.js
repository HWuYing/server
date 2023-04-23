import { makeDecorator, makeMethodDecorator, makeParamDecorator, setInjectableDef } from '@fm/di';
import { RouterParams } from './context';
import { RequestMethod } from './router-manager';
const controllerProps = (baseUrl, options) => ({ baseUrl, options });
const methodProps = (url, ...middleware) => ({ url, middleware });
export const Controller = makeDecorator('Control', controllerProps, setInjectableDef);
export const Get = makeMethodDecorator(RequestMethod.get, methodProps);
export const All = makeMethodDecorator(RequestMethod.all, methodProps);
export const Use = makeMethodDecorator(RequestMethod.use, methodProps);
export const Put = makeMethodDecorator(RequestMethod.put, methodProps);
export const Post = makeMethodDecorator(RequestMethod.post, methodProps);
export const Param = makeMethodDecorator(RequestMethod.param, methodProps);
export const Delete = makeMethodDecorator(RequestMethod.delete, methodProps);
export const Options = makeMethodDecorator(RequestMethod.options, methodProps);
export const Middleware = makeMethodDecorator(RequestMethod.middleware, methodProps);
export const Req = makeParamDecorator(RouterParams.req);
export const Res = makeParamDecorator(RouterParams.res);
export const Next = makeParamDecorator(RouterParams.next);
export function CustomParams(hook) {
    return makeParamDecorator(RouterParams.custom, (options) => (Object.assign({ hook }, options)));
}
