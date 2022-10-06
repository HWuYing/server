import { __awaiter, __generator, __spreadArray } from "tslib";
import { getProvider, Injector, StaticInjector } from '@fm/di';
import express from 'express';
import { createServer } from 'http';
var ExpressServerPlatform = /** @class */ (function () {
    function ExpressServerPlatform(port, providers) {
        this.port = port;
        this.providers = providers;
        this.rootInjector = getProvider(Injector);
    }
    ExpressServerPlatform.prototype.bootstrapStart = function (start) {
        return __awaiter(this, void 0, void 0, function () {
            var app, injector;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        app = express();
                        injector = this.beforeBootstrapStart([{ provide: express, useValue: app }]);
                        return [4 /*yield*/, start(injector).then(function () { return _this.listen(_this.port, app); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ExpressServerPlatform.prototype.beforeBootstrapStart = function (providers) {
        if (providers === void 0) { providers = []; }
        var injector = new StaticInjector(this.rootInjector, { isScope: 'self' });
        __spreadArray(__spreadArray([], this.providers, true), providers, true).forEach(function (provider) { return injector.set(provider.provide, provider); });
        return injector;
    };
    ExpressServerPlatform.prototype.listen = function (port, app) {
        global.hotHttpHost = "http://localhost:".concat(port, "/");
        global.hotHttpServer = createServer(app).listen(port, function () {
            console.log("The server is running at ".concat(global.hotHttpHost));
        });
    };
    return ExpressServerPlatform;
}());
export { ExpressServerPlatform };
