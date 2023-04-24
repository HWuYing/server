"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomParams = exports.Headers = exports.Params = exports.Query = exports.Body = exports.Next = exports.Res = exports.Req = exports.Ip = exports.Middleware = exports.Options = exports.Delete = exports.Param = exports.Post = exports.Put = exports.Use = exports.All = exports.Get = exports.ControllerModel = exports.Controller = void 0;
var tslib_1 = require("tslib");
var di_1 = require("@fm/di");
var constant_1 = require("./constant");
var manager_1 = require("./manager");
var paramsProps = function (key) { return ({ key: key }); };
var moduleProps = function (options) { return (tslib_1.__assign({}, options)); };
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
exports.Controller = (0, di_1.makeDecorator)(constant_1.CONTROLLER, controllerProps, di_1.setInjectableDef);
exports.ControllerModel = (0, di_1.makeDecorator)(constant_1.CONTROLLER_MODULE, moduleProps, manager_1.ControllerManager.getFactoryControlModel);
exports.Get = (0, di_1.makeMethodDecorator)(constant_1.RequestMethod.get, methodProps);
exports.All = (0, di_1.makeMethodDecorator)(constant_1.RequestMethod.all, methodProps);
exports.Use = (0, di_1.makeMethodDecorator)(constant_1.RequestMethod.use, methodProps);
exports.Put = (0, di_1.makeMethodDecorator)(constant_1.RequestMethod.put, methodProps);
exports.Post = (0, di_1.makeMethodDecorator)(constant_1.RequestMethod.post, methodProps);
exports.Param = (0, di_1.makeMethodDecorator)(constant_1.RequestMethod.param, methodProps);
exports.Delete = (0, di_1.makeMethodDecorator)(constant_1.RequestMethod.delete, methodProps);
exports.Options = (0, di_1.makeMethodDecorator)(constant_1.RequestMethod.options, methodProps);
exports.Middleware = (0, di_1.makeMethodDecorator)(constant_1.RequestMethod.middleware, methodProps);
exports.Ip = (0, di_1.makeParamDecorator)(constant_1.RouterParams.ip);
exports.Req = (0, di_1.makeParamDecorator)(constant_1.RouterParams.req);
exports.Res = (0, di_1.makeParamDecorator)(constant_1.RouterParams.res);
exports.Next = (0, di_1.makeParamDecorator)(constant_1.RouterParams.next);
exports.Body = (0, di_1.makeParamDecorator)(constant_1.RouterParams.body, paramsProps);
exports.Query = (0, di_1.makeParamDecorator)(constant_1.RouterParams.query, paramsProps);
exports.Params = (0, di_1.makeParamDecorator)(constant_1.RouterParams.params, paramsProps);
exports.Headers = (0, di_1.makeParamDecorator)(constant_1.RouterParams.headers, paramsProps);
function CustomParams(transform) {
    return (0, di_1.makeParamDecorator)(constant_1.RouterParams.custom, function (options) { return (tslib_1.__assign({ transform: transform }, options)); });
}
exports.CustomParams = CustomParams;
