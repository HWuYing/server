import { Injector, Type } from '@fm/di';
import { Express } from 'express';
export declare enum RequestMethod {
    post = "post",
    get = "get",
    delete = "delete",
    put = "put",
    all = "all",
    options = "options",
    param = "param",
    use = "use",
    middleware = "middleware"
}
export declare class RouterManager {
    app: Express;
    injector: Injector;
    private methodParams;
    private createRouter;
    register(controller: Type<any>): any;
}
