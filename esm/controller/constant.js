import { InjectorToken } from '@hwy-fm/di';
export const CONTROLLER_MODULE = 'ControllerModel';
export const CONTROLLER = 'Controller';
export const DISABLED_WRITE = Object.create({ write: 'disabled' });
export var RouterParams;
(function (RouterParams) {
    RouterParams["ip"] = "ip";
    RouterParams["req"] = "req";
    RouterParams["res"] = "res";
    RouterParams["next"] = "next";
    RouterParams["body"] = "body";
    RouterParams["query"] = "query";
    RouterParams["param"] = "param";
    RouterParams["headers"] = "headers";
})(RouterParams || (RouterParams = {}));
export var RequestMethod;
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
})(RequestMethod || (RequestMethod = {}));
export var ExtraMethod;
(function (ExtraMethod) {
    ExtraMethod["embeddedMiddleware"] = "embeddedMiddleware";
})(ExtraMethod || (ExtraMethod = {}));
export var ResponseHeader;
(function (ResponseHeader) {
    ResponseHeader["header"] = "header";
})(ResponseHeader || (ResponseHeader = {}));
export const FORMAT_URL = InjectorToken.get('FORMAT_URL');
export const CTX_STORAGE = InjectorToken.get('CTX_STORAGE');
export const MODULE_QUEUE = InjectorToken.get('MODULE_QUEUE');
