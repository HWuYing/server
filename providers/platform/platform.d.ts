import { Injector, Provider } from '@fm/di';
import { Express } from 'express';
type StartFn = (injector: Injector) => Promise<void>;
export declare class ExpressServerPlatform {
    private port;
    private platformInjector;
    constructor(port: number, platformInjector: Injector);
    bootstrapStart(additionalProviders: Provider[] | StartFn, start?: StartFn): Promise<void>;
    private beforeBootstrapStart;
    private runStart;
    private parseParams;
    listen(injector: Injector, app: Express): void;
}
export {};
