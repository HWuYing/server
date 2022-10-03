import { getProvider, Injector, StaticInjector } from '@fm/di';
import express from 'express';
import { createServer } from 'http';
export class ExpressServerPlatform {
    port;
    providers;
    rootInjector = getProvider(Injector);
    constructor(port, providers) {
        this.port = port;
        this.providers = providers;
    }
    async bootstrapStart(start) {
        const app = express();
        const injector = this.beforeBootstrapStart([{ provide: express, useValue: app }]);
        await start(injector).then(() => this.listen(this.port, app));
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
