"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MODULE_QUEUE = exports.CTX_STORAGE = exports.FORMAT_URL = exports.ResponseHeader = exports.ExtraMethod = exports.RequestMethod = exports.RouterParams = exports.DISABLED_WRITE = exports.CONTROLLER = exports.CONTROLLER_MODULE = void 0;
var di_1 = require("@hwy-fm/di");
exports.CONTROLLER_MODULE = 'ControllerModel';
exports.CONTROLLER = 'Controller';
exports.DISABLED_WRITE = Object.create({ write: 'disabled' });
var RouterParams;
(function (RouterParams) {
    RouterParams["ip"] = "ip";
    RouterParams["req"] = "req";
    RouterParams["res"] = "res";
    RouterParams["next"] = "next";
    RouterParams["body"] = "body";
    RouterParams["query"] = "query";
    RouterParams["param"] = "param";
    RouterParams["headers"] = "headers";
})(RouterParams || (exports.RouterParams = RouterParams = {}));
var RequestMethod;
(function (RequestMethod) {
    RequestMethod["use"] = "use";
    RequestMethod["get"] = "get";
    RequestMethod["put"] = "put";
    RequestMethod["all"] = "all";
    RequestMethod["post"] = "post";
    RequestMethod["patch"] = "patch";
    RequestMethod["trace"] = "trace";
    RequestMethod["delete"] = "delete";
    RequestMethod["options"] = "options";
    RequestMethod["connect"] = "connect";
    RequestMethod["middleware"] = "middleware";
})(RequestMethod || (exports.RequestMethod = RequestMethod = {}));
var ExtraMethod;
(function (ExtraMethod) {
    ExtraMethod["embeddedMiddleware"] = "embeddedMiddleware";
})(ExtraMethod || (exports.ExtraMethod = ExtraMethod = {}));
var ResponseHeader;
(function (ResponseHeader) {
    ResponseHeader["header"] = "header";
})(ResponseHeader || (exports.ResponseHeader = ResponseHeader = {}));
exports.FORMAT_URL = di_1.InjectorToken.get('FORMAT_URL');
exports.CTX_STORAGE = di_1.InjectorToken.get('CTX_STORAGE');
exports.MODULE_QUEUE = di_1.InjectorToken.get('MODULE_QUEUE');
