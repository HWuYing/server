"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomParams = exports.Next = exports.Res = exports.Req = exports.Middleware = exports.Options = exports.Delete = exports.Param = exports.Post = exports.Put = exports.Use = exports.All = exports.Get = exports.Controller = void 0;
var tslib_1 = require("tslib");
var di_1 = require("@fm/di");
var context_1 = require("./context");
var router_manager_1 = require("./router-manager");
var controllerProps = function (baseUrl, options) { return ({ baseUrl: baseUrl, options: options }); };
var methodProps = function (url) {
    var middleware = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        middleware[_i - 1] = arguments[_i];
    }
    return ({ url: url, middleware: middleware });
};
exports.Controller = (0, di_1.makeDecorator)('Control', controllerProps, di_1.setInjectableDef);
exports.Get = (0, di_1.makeMethodDecorator)(router_manager_1.RequestMethod.get, methodProps);
exports.All = (0, di_1.makeMethodDecorator)(router_manager_1.RequestMethod.all, methodProps);
exports.Use = (0, di_1.makeMethodDecorator)(router_manager_1.RequestMethod.use, methodProps);
exports.Put = (0, di_1.makeMethodDecorator)(router_manager_1.RequestMethod.put, methodProps);
exports.Post = (0, di_1.makeMethodDecorator)(router_manager_1.RequestMethod.post, methodProps);
exports.Param = (0, di_1.makeMethodDecorator)(router_manager_1.RequestMethod.param, methodProps);
exports.Delete = (0, di_1.makeMethodDecorator)(router_manager_1.RequestMethod.delete, methodProps);
exports.Options = (0, di_1.makeMethodDecorator)(router_manager_1.RequestMethod.options, methodProps);
exports.Middleware = (0, di_1.makeMethodDecorator)(router_manager_1.RequestMethod.middleware, methodProps);
exports.Req = (0, di_1.makeParamDecorator)(context_1.RouterParams.req);
exports.Res = (0, di_1.makeParamDecorator)(context_1.RouterParams.res);
exports.Next = (0, di_1.makeParamDecorator)(context_1.RouterParams.next);
function CustomParams(hook) {
    return (0, di_1.makeParamDecorator)(context_1.RouterParams.custom, function (options) { return (tslib_1.__assign({ hook: hook }, options)); });
}
exports.CustomParams = CustomParams;
