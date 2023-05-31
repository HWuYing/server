"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomParams = exports.Headers = exports.Params = exports.Query = exports.Body = exports.Next = exports.Res = exports.Req = exports.Ip = exports.CustomerMethod = exports.Middleware = exports.Options = exports.Delete = exports.Param = exports.Post = exports.Put = exports.Use = exports.All = exports.Get = exports.ControllerModel = exports.Controller = void 0;
var tslib_1 = require("tslib");
var di_1 = require("@fm/di");
var constant_1 = require("./constant");
var manager_1 = require("./manager");
function paramsTransform(annotation, data) {
    var _a = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        _a[_i - 2] = arguments[_i];
    }
    var req = _a[0], next = _a[2];
    var ctx = req.__fmCtx__;
    return ctx.getParamByMetadata(annotation, data, next);
}
var moduleProps = function (options) { return (tslib_1.__assign({}, options)); };
var paramsProps = function (key) { return ({ key: key, transform: paramsTransform }); };
var methodProps = function (url) {
    var middleware = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        middleware[_i - 1] = arguments[_i];
    }
    return ({ url: url, middleware: middleware });
};
var controllerProps = function (baseUrl, options) {
    if (options === void 0) { options = {}; }
    return ({ baseUrl: baseUrl, options: options });
};
exports.Controller = (0, di_1.makeDecorator)(constant_1.CONTROLLER, controllerProps, di_1.setInjectableDef);
exports.ControllerModel = (0, di_1.makeDecorator)(constant_1.CONTROLLER_MODULE, moduleProps, manager_1.getFactoryControlModel);
exports.Get = (0, di_1.makeMethodDecorator)(constant_1.RequestMethod.get, methodProps);
exports.All = (0, di_1.makeMethodDecorator)(constant_1.RequestMethod.all, methodProps);
exports.Use = (0, di_1.makeMethodDecorator)(constant_1.RequestMethod.use, methodProps);
exports.Put = (0, di_1.makeMethodDecorator)(constant_1.RequestMethod.put, methodProps);
exports.Post = (0, di_1.makeMethodDecorator)(constant_1.RequestMethod.post, methodProps);
exports.Param = (0, di_1.makeMethodDecorator)(constant_1.RequestMethod.param, methodProps);
exports.Delete = (0, di_1.makeMethodDecorator)(constant_1.RequestMethod.delete, methodProps);
exports.Options = (0, di_1.makeMethodDecorator)(constant_1.RequestMethod.options, methodProps);
exports.Middleware = (0, di_1.makeMethodDecorator)(constant_1.RequestMethod.middleware, methodProps);
var CustomerMethod = function (hook) {
    return (0, di_1.makeMethodDecorator)(constant_1.RequestMethod.requestCustom, function (options) { return (tslib_1.__assign({ hook: hook }, options)); });
};
exports.CustomerMethod = CustomerMethod;
exports.Ip = (0, di_1.makeParamDecorator)(constant_1.RouterParams.ip, paramsProps);
exports.Req = (0, di_1.makeParamDecorator)(constant_1.RouterParams.req, paramsProps);
exports.Res = (0, di_1.makeParamDecorator)(constant_1.RouterParams.res, paramsProps);
exports.Next = (0, di_1.makeParamDecorator)(constant_1.RouterParams.next, paramsProps);
exports.Body = (0, di_1.makeParamDecorator)(constant_1.RouterParams.body, paramsProps);
exports.Query = (0, di_1.makeParamDecorator)(constant_1.RouterParams.query, paramsProps);
exports.Params = (0, di_1.makeParamDecorator)(constant_1.RouterParams.params, paramsProps);
exports.Headers = (0, di_1.makeParamDecorator)(constant_1.RouterParams.headers, paramsProps);
function CustomParams(transform) {
    return (0, di_1.makeParamDecorator)(constant_1.RouterParams.routerCustom, function (options) { return (tslib_1.__assign({ transform: transform }, options)); });
}
exports.CustomParams = CustomParams;
