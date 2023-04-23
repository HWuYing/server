import { __assign } from "tslib";
import { makeDecorator, makeMethodDecorator, makeParamDecorator, setInjectableDef } from '@fm/di';
import { RouterParams } from './context';
import { RequestMethod } from './router-manager';
var controllerProps = function (baseUrl, options) { return ({ baseUrl: baseUrl, options: options }); };
var methodProps = function (url) {
    var middleware = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        middleware[_i - 1] = arguments[_i];
    }
    return ({ url: url, middleware: middleware });
};
export var Controller = makeDecorator('Control', controllerProps, setInjectableDef);
export var Get = makeMethodDecorator(RequestMethod.get, methodProps);
export var All = makeMethodDecorator(RequestMethod.all, methodProps);
export var Use = makeMethodDecorator(RequestMethod.use, methodProps);
export var Put = makeMethodDecorator(RequestMethod.put, methodProps);
export var Post = makeMethodDecorator(RequestMethod.post, methodProps);
export var Param = makeMethodDecorator(RequestMethod.param, methodProps);
export var Delete = makeMethodDecorator(RequestMethod.delete, methodProps);
export var Options = makeMethodDecorator(RequestMethod.options, methodProps);
export var Middleware = makeMethodDecorator(RequestMethod.middleware, methodProps);
export var Req = makeParamDecorator(RouterParams.req);
export var Res = makeParamDecorator(RouterParams.res);
export var Next = makeParamDecorator(RouterParams.next);
export function CustomParams(hook) {
    return makeParamDecorator(RouterParams.custom, function (options) { return (__assign({ hook: hook }, options)); });
}
