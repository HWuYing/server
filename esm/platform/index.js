import { __awaiter } from "tslib";
import { APPLICATION_METADATA, APPLICATION_TOKEN } from '@fm/core/token';
import { Injector } from '@fm/di';
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
            const [providers = [], _start] = this.parseParams(additionalProviders, start);
            const injector = this.beforeBootstrapStart(providers);
            yield this.runStart(injector, undefined, _start);
            yield injector.get(DBManager).register();
            yield injector.get(ControllerManager).register();
            this.listen(injector);
        });
    }
    beforeBootstrapStart(providers = []) {
        return Injector.create(providers, this.platformInjector);
    }
    runStart(injector, options, start) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const application = yield injector.get(APPLICATION_TOKEN);
            return (_a = (start || application.start)) === null || _a === void 0 ? void 0 : _a.call(application, injector, options);
        });
    }
    parseParams(providers, start) {
        return typeof providers === 'function' ? [[], providers] : [[...providers], start];
    }
    listen(injector) {
        const server = injector.get(HTTP_SERVER);
        const { port = this.port } = injector.get(APPLICATION_METADATA) || {};
        global.hotHttpHost = `http://localhost:${port}/`;
        global.hotHttpServer = server.listen(port, () => {
            console.log(`The server is running at ${global.hotHttpHost}`);
        });
    }
}
