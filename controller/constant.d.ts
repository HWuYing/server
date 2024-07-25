import { InjectorToken } from '@hwy-fm/di';
export declare const CONTROLLER_MODULE = "ControllerModel";
export declare const CONTROLLER = "Controller";
export declare enum RouterParams {
    ip = "ip",
    req = "req",
    res = "res",
    next = "next",
    body = "body",
    query = "query",
    params = "params",
    headers = "headers"
}
export declare enum RequestMethod {
    use = "use",
    get = "get",
    put = "put",
    all = "all",
    post = "post",
    param = "param",
    delete = "delete",
    options = "options",
    middleware = "middleware"
}
export declare enum ExtraMethod {
    embeddedMiddleware = "embeddedMiddleware"
}
export declare const CTX_STORAGE: InjectorToken;
export declare const MODULE_QUEUE: InjectorToken;
