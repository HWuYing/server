import { __assign } from "tslib";
import { makeDecorator, makeMethodDecorator, makeParamDecorator, setInjectableDef } from '@fm/di';
import { CONTROLLER, CONTROLLER_MODULE, RequestMethod, RouterParams } from './constant';
import { ControllerManager } from './manager';
var paramsProps = function (key) { return ({ key: key }); };
var moduleProps = function (options) { return (__assign({}, options)); };
var controllerProps = function (baseUrl, options) {
    if (options === void 0) { options = {}; }
    return ({ baseUrl: baseUrl, options: options });
};
var methodProps = function (url) {
    var middleware = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        middleware[_i - 1] = arguments[_i];
    }
    return ({ url: url, middleware: middleware });
};
export var Controller = makeDecorator(CONTROLLER, controllerProps, setInjectableDef);
export var ControllerModel = makeDecorator(CONTROLLER_MODULE, moduleProps, ControllerManager.getFactoryControlModel);
export var Get = makeMethodDecorator(RequestMethod.get, methodProps);
export var All = makeMethodDecorator(RequestMethod.all, methodProps);
export var Use = makeMethodDecorator(RequestMethod.use, methodProps);
export var Put = makeMethodDecorator(RequestMethod.put, methodProps);
export var Post = makeMethodDecorator(RequestMethod.post, methodProps);
export var Param = makeMethodDecorator(RequestMethod.param, methodProps);
export var Delete = makeMethodDecorator(RequestMethod.delete, methodProps);
export var Options = makeMethodDecorator(RequestMethod.options, methodProps);
export var Middleware = makeMethodDecorator(RequestMethod.middleware, methodProps);
export var Ip = makeParamDecorator(RouterParams.ip);
export var Req = makeParamDecorator(RouterParams.req);
export var Res = makeParamDecorator(RouterParams.res);
export var Next = makeParamDecorator(RouterParams.next);
export var Body = makeParamDecorator(RouterParams.body, paramsProps);
export var Query = makeParamDecorator(RouterParams.query, paramsProps);
export var Params = makeParamDecorator(RouterParams.params, paramsProps);
export var Headers = makeParamDecorator(RouterParams.headers, paramsProps);
export function CustomParams(transform) {
    return makeParamDecorator(RouterParams.custom, function (options) { return (__assign({ transform: transform }, options)); });
}
