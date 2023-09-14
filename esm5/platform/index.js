import { __awaiter, __generator, __spreadArray } from "tslib";
import { APPLICATION_METADATA, APPLICATION_TOKEN } from '@fm/core/token';
import { Injector } from '@fm/di';
import express from 'express';
import { createServer } from 'http';
import { ControllerManager } from '../controller';
import { DBManager } from '../db/db-manager';
import { HTTP_SERVER } from '../token';
var ExpressServerPlatform = /** @class */ (function () {
    function ExpressServerPlatform(port, platformInjector) {
        this.port = port;
        this.platformInjector = platformInjector;
    }
    ExpressServerPlatform.prototype.bootstrapStart = function (additionalProviders, start) {
        return __awaiter(this, void 0, void 0, function () {
            var app, _a, _b, providers, _start, injector, application;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        app = express();
                        _a = this.parseParams(additionalProviders, start), _b = _a[0], providers = _b === void 0 ? [] : _b, _start = _a[1];
                        injector = this.beforeBootstrapStart([providers, { provide: express, useValue: app }]);
                        return [4 /*yield*/, injector.get(APPLICATION_TOKEN)];
                    case 1:
                        application = _c.sent();
                        this.server = injector.get(HTTP_SERVER) || createServer(app);
                        return [4 /*yield*/, this.runStart(injector, undefined, application, _start)];
                    case 2:
                        _c.sent();
                        return [4 /*yield*/, injector.get(DBManager).register()];
                    case 3:
                        _c.sent();
                        return [4 /*yield*/, injector.get(ControllerManager).register()];
                    case 4:
                        _c.sent();
                        this.listen(injector);
                        return [2 /*return*/];
                }
            });
        });
    };
    ExpressServerPlatform.prototype.beforeBootstrapStart = function (providers) {
        if (providers === void 0) { providers = []; }
        return Injector.create(providers, this.platformInjector);
    };
    ExpressServerPlatform.prototype.runStart = function (injector, options, application, start) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, (start || application.start).call(application, injector, options)];
            });
        });
    };
    ExpressServerPlatform.prototype.parseParams = function (providers, start) {
        return typeof providers === 'function' ? [[], providers] : [__spreadArray([], providers, true), start];
    };
    ExpressServerPlatform.prototype.listen = function (injector) {
        var _a = (injector.get(APPLICATION_METADATA) || {}).port, port = _a === void 0 ? this.port : _a;
        global.hotHttpHost = "http://localhost:".concat(port, "/");
        global.hotHttpServer = this.server.listen(port, function () {
            console.log("The server is running at ".concat(global.hotHttpHost));
        });
    };
    return ExpressServerPlatform;
}());
export { ExpressServerPlatform };
