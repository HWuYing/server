import { __awaiter } from "tslib";
import { APPLICATION_METADATA, APPLICATION_TOKEN } from '@hwy-fm/core/token';
import { Injector } from '@hwy-fm/di';
import { createServer } from 'http';
import { HTTP_SERVER, SERVER_HANDLER } from '../token';
export class ExpressServerPlatform {
    constructor(platformInjector) {
        this.platformInjector = platformInjector;
    }
    bootstrapStart() {
        return __awaiter(this, arguments, void 0, function* (providers = []) {
            const injector = this.beforeBootstrapStart(providers);
            yield this.runStart(injector);
            this.listen(injector);
        });
    }
    beforeBootstrapStart(providers = []) {
        return Injector.create([
            { provide: SERVER_HANDLER, useValue: (_, res) => res.end() },
            { provide: HTTP_SERVER, useFactory: createServer, deps: [SERVER_HANDLER] },
            providers
        ], this.platformInjector);
    }
    runStart(injector) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const application = yield injector.get(APPLICATION_TOKEN);
            return (_a = application.main) === null || _a === void 0 ? void 0 : _a.call(application, injector);
        });
    }
    listen(injector) {
        var _a;
        const server = injector.get(HTTP_SERVER);
        const port = (_a = injector.get(APPLICATION_METADATA)) === null || _a === void 0 ? void 0 : _a.port;
        global.hotHttpHost = `http://localhost:${port}/`;
        server === null || server === void 0 ? void 0 : server.listen(port, () => console.log(`The server is running at ${global.hotHttpHost}`));
        hotReload && hotReload(() => {
            server === null || server === void 0 ? void 0 : server.close();
            injector.destroy();
            this.platformInjector.destroy();
        });
    }
}
