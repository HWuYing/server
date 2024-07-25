"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MODULE_QUEUE = exports.CTX_STORAGE = exports.ExtraMethod = exports.RequestMethod = exports.RouterParams = exports.CONTROLLER = exports.CONTROLLER_MODULE = void 0;
var di_1 = require("@hwy-fm/di");
exports.CONTROLLER_MODULE = 'ControllerModel';
exports.CONTROLLER = 'Controller';
var RouterParams;
(function (RouterParams) {
    RouterParams["ip"] = "ip";
    RouterParams["req"] = "req";
    RouterParams["res"] = "res";
    RouterParams["next"] = "next";
    RouterParams["body"] = "body";
    RouterParams["query"] = "query";
    RouterParams["params"] = "params";
    RouterParams["headers"] = "headers";
})(RouterParams || (exports.RouterParams = RouterParams = {}));
var RequestMethod;
(function (RequestMethod) {
    RequestMethod["use"] = "use";
    RequestMethod["get"] = "get";
    RequestMethod["put"] = "put";
    RequestMethod["all"] = "all";
    RequestMethod["post"] = "post";
    RequestMethod["param"] = "param";
    RequestMethod["delete"] = "delete";
    RequestMethod["options"] = "options";
    RequestMethod["middleware"] = "middleware";
})(RequestMethod || (exports.RequestMethod = RequestMethod = {}));
var ExtraMethod;
(function (ExtraMethod) {
    ExtraMethod["embeddedMiddleware"] = "embeddedMiddleware";
})(ExtraMethod || (exports.ExtraMethod = ExtraMethod = {}));
exports.CTX_STORAGE = di_1.InjectorToken.get('CTX_STORAGE');
exports.MODULE_QUEUE = di_1.InjectorToken.get('MODULE_QUEUE');
