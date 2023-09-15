import { Injector, Provider } from '@fm/di';
type StartFn = (injector: Injector) => Promise<void>;
export declare class ExpressServerPlatform {
    private port;
    private platformInjector;
    constructor(port: number, platformInjector: Injector);
    bootstrapStart(additionalProviders: Provider[] | StartFn, start?: StartFn): Promise<void>;
    private beforeBootstrapStart;
    private runStart;
    private parseParams;
    private listen;
}
export {};
