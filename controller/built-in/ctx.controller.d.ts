import { Injector } from '@fm/di';
import { Router } from 'express';
export declare class Ctx {
    injector: Injector;
    createCtx(router: Router): void;
}
