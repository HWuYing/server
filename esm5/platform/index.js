import { __awaiter, __generator, __spreadArray } from "tslib";
import { APPLICATION_METADATA, APPLICATION_TOKEN } from '@fm/core/token';
import { Injector } from '@fm/di';
import express from 'express';
import { createServer } from 'http';
import { HTTP_SERVER } from '../token';
var ExpressServerPlatform = /** @class */ (function () {
    function ExpressServerPlatform(port, platformInjector) {
        this.port = port;
        this.platformInjector = platformInjector;
    }
    ExpressServerPlatform.prototype.bootstrapStart = function (additionalProviders, start) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, providers, _start, injector;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = this.parseParams(additionalProviders, start), _b = _a[0], providers = _b === void 0 ? [] : _b, _start = _a[1];
                        injector = this.beforeBootstrapStart(providers);
                        return [4 /*yield*/, this.runStart(injector, undefined, _start)];
                    case 1:
                        _c.sent();
                        this.listen(injector);
                        return [2 /*return*/];
                }
            });
        });
    };
    ExpressServerPlatform.prototype.beforeBootstrapStart = function (providers) {
        if (providers === void 0) { providers = []; }
        return Injector.create([
            { provide: express, useFactory: function () { return express(); } },
            { provide: HTTP_SERVER, useFactory: createServer, deps: [express] },
            providers
        ], this.platformInjector);
    };
    ExpressServerPlatform.prototype.runStart = function (injector, options, start) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var application;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, injector.get(APPLICATION_TOKEN)];
                    case 1:
                        application = _b.sent();
                        return [2 /*return*/, (_a = (start || application.main)) === null || _a === void 0 ? void 0 : _a.call(application, injector, options)];
                }
            });
        });
    };
    ExpressServerPlatform.prototype.parseParams = function (providers, start) {
        return typeof providers === 'function' ? [[], providers] : [__spreadArray([], providers, true), start];
    };
    ExpressServerPlatform.prototype.listen = function (injector) {
        var server = injector.get(HTTP_SERVER);
        var _a = (injector.get(APPLICATION_METADATA) || {}).port, port = _a === void 0 ? this.port : _a;
        global.hotHttpHost = "http://localhost:".concat(port, "/");
        global.hotHttpServer = server.listen(port, function () {
            console.log("The server is running at ".concat(global.hotHttpHost));
        });
    };
    return ExpressServerPlatform;
}());
export { ExpressServerPlatform };
