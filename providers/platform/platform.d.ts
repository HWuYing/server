import { Injector, Provider } from '@fm/di';
import { Express } from 'express';
declare type StartFn = (injector: Injector) => Promise<void>;
export declare class ExpressServerPlatform {
    private port;
    private platformInjector;
    constructor(port: number, platformInjector: Injector);
    bootstrapStart(additionalProviders: Provider[] | StartFn, start?: StartFn): Promise<void>;
    private beforeBootstrapStart;
    private parseParams;
    listen(port: number, app: Express): void;
}
export {};
