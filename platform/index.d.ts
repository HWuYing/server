/// <reference types="node" />
import { Injector, Provider } from '@fm/di';
import { Server } from 'http';
type StartFn = (injector: Injector) => Promise<void>;
export declare class ExpressServerPlatform {
    private port;
    private platformInjector;
    server: Server;
    constructor(port: number, platformInjector: Injector);
    bootstrapStart(additionalProviders: Provider[] | StartFn, start?: StartFn): Promise<void>;
    private beforeBootstrapStart;
    private runStart;
    private parseParams;
    listen(injector: Injector): void;
}
export {};
