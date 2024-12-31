import { InjectorToken } from '@hwy-fm/di';
export declare const CONTROLLER_MODULE = "ControllerModel";
export declare const CONTROLLER = "Controller";
export declare const DISABLED_WRITE: any;
export declare enum RouterParams {
    ip = "ip",
    req = "req",
    res = "res",
    next = "next",
    body = "body",
    query = "query",
    param = "param",
    headers = "headers"
}
export declare enum RequestMethod {
    use = "use",
    get = "get",
    put = "put",
    all = "all",
    post = "post",
    patch = "patch",
    trace = "trace",
    delete = "delete",
    options = "options",
    connect = "connect",
    middleware = "middleware"
}
export declare enum ExtraMethod {
    embeddedMiddleware = "embeddedMiddleware"
}
export declare enum ResponseHeader {
    header = "header"
}
export declare const FORMAT_URL: InjectorToken;
export declare const CTX_STORAGE: InjectorToken;
export declare const MODULE_QUEUE: InjectorToken;
