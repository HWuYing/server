import { __awaiter } from "tslib";
import { APPLICATION_METADATA, APPLICATION_TOKEN } from '@fm/core/providers/platform';
import { Injector } from '@fm/di';
import express from 'express';
import { createServer } from 'http';
export class ExpressServerPlatform {
    constructor(port, platformInjector) {
        this.port = port;
        this.platformInjector = platformInjector;
    }
    bootstrapStart(additionalProviders, start) {
        return __awaiter(this, void 0, void 0, function* () {
            const app = express();
            const [providers = [], _start] = this.parseParams(additionalProviders, start);
            const injector = this.beforeBootstrapStart([providers, { provide: express, useValue: app }]);
            yield this.runStart(injector, undefined, _start);
            this.listen(this.port, app);
        });
    }
    beforeBootstrapStart(providers = []) {
        return Injector.create([providers], this.platformInjector);
    }
    runStart(injector, options, start) {
        const application = injector.get(APPLICATION_TOKEN);
        return (start || application.start).call(application, injector, options);
    }
    parseParams(providers, start) {
        return typeof providers === 'function' ? [[], providers] : [[...providers], start];
    }
    listen(port, app) {
        const { port: metadataPort = port } = this.platformInjector.get(APPLICATION_METADATA) || {};
        global.hotHttpHost = `http://localhost:${metadataPort}/`;
        global.hotHttpServer = createServer(app).listen(metadataPort, () => {
            console.log(`The server is running at ${global.hotHttpHost}`);
        });
    }
}
