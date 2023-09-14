import { __awaiter } from "tslib";
import { APPLICATION_METADATA, APPLICATION_TOKEN } from '@fm/core/token';
import { Injector } from '@fm/di';
import express from 'express';
import { createServer } from 'http';
import { ControllerManager } from '../controller';
import { DBManager } from '../db/db-manager';
import { HTTP_SERVER } from '../token';
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
            const application = yield injector.get(APPLICATION_TOKEN);
            this.server = injector.get(HTTP_SERVER) || createServer(app);
            yield this.runStart(injector, undefined, application, _start);
            yield injector.get(DBManager).register();
            yield injector.get(ControllerManager).register();
            this.listen(injector);
        });
    }
    beforeBootstrapStart(providers = []) {
        return Injector.create(providers, this.platformInjector);
    }
    runStart(injector, options, application, start) {
        return __awaiter(this, void 0, void 0, function* () {
            return (start || application.start).call(application, injector, options);
        });
    }
    parseParams(providers, start) {
        return typeof providers === 'function' ? [[], providers] : [[...providers], start];
    }
    listen(injector) {
        const { port = this.port } = injector.get(APPLICATION_METADATA) || {};
        global.hotHttpHost = `http://localhost:${port}/`;
        global.hotHttpServer = this.server.listen(port, () => {
            console.log(`The server is running at ${global.hotHttpHost}`);
        });
    }
}
