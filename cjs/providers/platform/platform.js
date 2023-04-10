"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpressServerPlatform = void 0;
var tslib_1 = require("tslib");
var platform_1 = require("@fm/core/providers/platform");
var di_1 = require("@fm/di");
var express_1 = tslib_1.__importDefault(require("express"));
var http_1 = require("http");
var ExpressServerPlatform = /** @class */ (function () {
    function ExpressServerPlatform(port, platformInjector) {
        this.port = port;
        this.platformInjector = platformInjector;
    }
    ExpressServerPlatform.prototype.bootstrapStart = function (additionalProviders, start) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var app, _a, _b, providers, _start, injector;
            return tslib_1.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        app = (0, express_1.default)();
                        _a = this.parseParams(additionalProviders, start), _b = _a[0], providers = _b === void 0 ? [] : _b, _start = _a[1];
                        injector = this.beforeBootstrapStart([providers, { provide: express_1.default, useValue: app }]);
                        return [4 /*yield*/, this.runStart(injector, undefined, _start)];
                    case 1:
                        _c.sent();
                        this.listen(injector, app);
                        return [2 /*return*/];
                }
            });
        });
    };
    ExpressServerPlatform.prototype.beforeBootstrapStart = function (providers) {
        if (providers === void 0) { providers = []; }
        return di_1.Injector.create([providers], this.platformInjector);
    };
    ExpressServerPlatform.prototype.runStart = function (injector, options, start) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var application;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, injector.get(platform_1.APPLICATION_TOKEN)];
                    case 1:
                        application = _a.sent();
                        return [2 /*return*/, (start || application.start).call(application, injector, options)];
                }
            });
        });
    };
    ExpressServerPlatform.prototype.parseParams = function (providers, start) {
        return typeof providers === 'function' ? [[], providers] : [tslib_1.__spreadArray([], providers, true), start];
    };
    ExpressServerPlatform.prototype.listen = function (injector, app) {
        var _a = (injector.get(platform_1.APPLICATION_METADATA) || {}).port, port = _a === void 0 ? this.port : _a;
        global.hotHttpHost = "http://localhost:".concat(port, "/");
        global.hotHttpServer = (0, http_1.createServer)(app).listen(port, function () {
            console.log("The server is running at ".concat(global.hotHttpHost));
        });
    };
    return ExpressServerPlatform;
}());
exports.ExpressServerPlatform = ExpressServerPlatform;
