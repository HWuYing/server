import { Injector, Provider } from '@fm/di';
import { Express } from 'express';
export declare class ExpressServerPlatform {
    private providers;
    private rootInjector;
    constructor(providers: Provider[]);
    bootstrapStart(start: (injector: Injector) => Promise<void>): Promise<void>;
    private beforeBootstrapStart;
    listen(port: number, app: Express): void;
}
