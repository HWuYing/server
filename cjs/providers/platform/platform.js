"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpressServerPlatform = void 0;
const tslib_1 = require("tslib");
const di_1 = require("@fm/di");
const express_1 = tslib_1.__importDefault(require("express"));
const http_1 = require("http");
class ExpressServerPlatform {
    port;
    providers;
    rootInjector = (0, di_1.getProvider)(di_1.Injector);
    constructor(port, providers) {
        this.port = port;
        this.providers = providers;
    }
    async bootstrapStart(start) {
        const app = (0, express_1.default)();
        const injector = this.beforeBootstrapStart([{ provide: express_1.default, useValue: app }]);
        await start(injector).then(() => this.listen(this.port, app));
    }
    beforeBootstrapStart(providers = []) {
        const injector = new di_1.StaticInjector(this.rootInjector, { isScope: 'self' });
        [...this.providers, ...providers].forEach((provider) => injector.set(provider.provide, provider));
        return injector;
    }
    listen(port, app) {
        global.hotHttpHost = `http://localhost:${port}/`;
        global.hotHttpServer = (0, http_1.createServer)(app).listen(port, () => {
            console.log(`The server is running at ${global.hotHttpHost}`);
        });
    }
}
exports.ExpressServerPlatform = ExpressServerPlatform;
