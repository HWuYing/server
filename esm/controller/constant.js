import { InjectorToken } from '@hwy-fm/di';
export const CONTROLLER_MODULE = 'ControllerModel';
export const CONTROLLER = 'Controller';
export var RouterParams;
(function (RouterParams) {
    RouterParams["ip"] = "ip";
    RouterParams["req"] = "req";
    RouterParams["res"] = "res";
    RouterParams["next"] = "next";
    RouterParams["body"] = "body";
    RouterParams["query"] = "query";
    RouterParams["params"] = "params";
    RouterParams["headers"] = "headers";
})(RouterParams || (RouterParams = {}));
export var RequestMethod;
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
})(RequestMethod || (RequestMethod = {}));
export var ExtraMethod;
(function (ExtraMethod) {
    ExtraMethod["embeddedMiddleware"] = "embeddedMiddleware";
})(ExtraMethod || (ExtraMethod = {}));
export const CTX_STORAGE = InjectorToken.get('CTX_STORAGE');
export const MODULE_QUEUE = InjectorToken.get('MODULE_QUEUE');
