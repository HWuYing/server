import { Injector, Provider } from '@fm/di';
import { Express } from 'express';
export declare class ExpressServerPlatform {
    private port;
    private providers;
    private rootInjector;
    constructor(port: number, providers: Provider[]);
    bootstrapStart(start: (injector: Injector) => Promise<void>): Promise<void>;
    private beforeBootstrapStart;
    listen(port: number, app: Express): void;
}
