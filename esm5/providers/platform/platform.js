import { __awaiter, __generator, __spreadArray } from "tslib";
import { APPLICATION_METADATA, APPLICATION_TOKEN } from '@fm/core/providers/platform';
import { Injector } from '@fm/di';
import express from 'express';
import { createServer } from 'http';
var ExpressServerPlatform = /** @class */ (function () {
    function ExpressServerPlatform(port, platformInjector) {
        this.port = port;
        this.platformInjector = platformInjector;
    }
    ExpressServerPlatform.prototype.bootstrapStart = function (additionalProviders, start) {
        return __awaiter(this, void 0, void 0, function () {
            var app, _a, _b, providers, _start, injector;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        app = express();
                        _a = this.parseParams(additionalProviders, start), _b = _a[0], providers = _b === void 0 ? [] : _b, _start = _a[1];
                        injector = this.beforeBootstrapStart([providers, { provide: express, useValue: app }]);
                        return [4 /*yield*/, this.runStart(injector, undefined, _start)];
                    case 1:
                        _c.sent();
                        this.listen(this.port, app);
                        return [2 /*return*/];
                }
            });
        });
    };
    ExpressServerPlatform.prototype.beforeBootstrapStart = function (providers) {
        if (providers === void 0) { providers = []; }
        return Injector.create([providers], this.platformInjector);
    };
    ExpressServerPlatform.prototype.runStart = function (injector, options, start) {
        var application = injector.get(APPLICATION_TOKEN);
        return (start || application.start).call(application, injector, options);
    };
    ExpressServerPlatform.prototype.parseParams = function (providers, start) {
        return typeof providers === 'function' ? [[], providers] : [__spreadArray([], providers, true), start];
    };
    ExpressServerPlatform.prototype.listen = function (port, app) {
        var _a = (this.platformInjector.get(APPLICATION_METADATA) || {}).port, metadataPort = _a === void 0 ? port : _a;
        global.hotHttpHost = "http://localhost:".concat(metadataPort, "/");
        global.hotHttpServer = createServer(app).listen(metadataPort, function () {
            console.log("The server is running at ".concat(global.hotHttpHost));
        });
    };
    return ExpressServerPlatform;
}());
export { ExpressServerPlatform };
