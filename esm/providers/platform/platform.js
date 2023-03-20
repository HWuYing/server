import { __awaiter } from "tslib";
import { Injector, INJECTOR_SCOPE } from '@fm/di';
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
            yield _start(injector).then(() => this.listen(this.port, app));
        });
    }
    beforeBootstrapStart(providers = []) {
        return Injector.create([{ provide: INJECTOR_SCOPE, useValue: 'root' }, providers], this.platformInjector);
    }
    parseParams(providers, start) {
        return typeof providers === 'function' ? [[], providers] : [[...providers], start];
    }
    listen(port, app) {
        global.hotHttpHost = `http://localhost:${port}/`;
        global.hotHttpServer = createServer(app).listen(port, () => {
            console.log(`The server is running at ${global.hotHttpHost}`);
        });
    }
}
