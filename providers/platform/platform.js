import { getProvider, Injector, StaticInjector } from '@fm/di';
import express from 'express';
import { createServer } from 'http';
import { PORT } from '../../token';
export class ExpressServerPlatform {
    providers;
    rootInjector = getProvider(Injector);
    constructor(providers) {
        this.providers = providers;
    }
    async bootstrapStart(start) {
        const injector = this.beforeBootstrapStart([{ provide: express, useValue: express() }]);
        const port = injector.get(PORT) || 3000;
        await start(injector).then(() => this.listen(port, injector.get(express)));
    }
    beforeBootstrapStart(providers = []) {
        const injector = new StaticInjector(this.rootInjector, { isScope: 'self' });
        [...this.providers, ...providers].forEach((provider) => injector.set(provider.provide, provider));
        return injector;
    }
    listen(port, app) {
        global.hotHttpHost = `http://localhost:${port}/`;
        global.hotHttpServer = createServer(app).listen(port, () => {
            console.log(`The server is running at ${global.hotHttpHost}`);
        });
    }
}
