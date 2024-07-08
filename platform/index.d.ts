import { Injector, Provider } from '@hwy-fm/di';
export declare class ExpressServerPlatform {
    private platformInjector;
    constructor(platformInjector: Injector);
    bootstrapStart(providers?: Provider[]): Promise<void>;
    private beforeBootstrapStart;
    private runStart;
    private listen;
}
