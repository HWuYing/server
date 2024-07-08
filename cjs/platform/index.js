"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpressServerPlatform = void 0;
var tslib_1 = require("tslib");
var token_1 = require("@hwy-fm/core/token");
var di_1 = require("@hwy-fm/di");
var http_1 = require("http");
var token_2 = require("../token");
var ExpressServerPlatform = /** @class */ (function () {
    function ExpressServerPlatform(platformInjector) {
        this.platformInjector = platformInjector;
    }
    ExpressServerPlatform.prototype.bootstrapStart = function () {
        return tslib_1.__awaiter(this, arguments, void 0, function (providers) {
            var injector;
            if (providers === void 0) { providers = []; }
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        injector = this.beforeBootstrapStart(providers);
                        return [4 /*yield*/, this.runStart(injector)];
                    case 1:
                        _a.sent();
                        this.listen(injector);
                        return [2 /*return*/];
                }
            });
        });
    };
    ExpressServerPlatform.prototype.beforeBootstrapStart = function (providers) {
        if (providers === void 0) { providers = []; }
        return di_1.Injector.create([
            { provide: token_2.FORMAT_HOST_LISTEN, useValue: function (port) { return "http://localhost:".concat(port, "/"); } },
            { provide: token_2.SERVER_HANDLER, useValue: function (_, res) { return res.end(); } },
            { provide: token_2.HTTP_SERVER, useFactory: http_1.createServer, deps: [token_2.SERVER_HANDLER] },
            providers
        ], this.platformInjector);
    };
    ExpressServerPlatform.prototype.runStart = function (injector) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var application;
            var _a;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, injector.get(token_1.APPLICATION_TOKEN)];
                    case 1:
                        application = _b.sent();
                        return [2 /*return*/, (_a = application.main) === null || _a === void 0 ? void 0 : _a.call(application, injector)];
                }
            });
        });
    };
    ExpressServerPlatform.prototype.listen = function (injector) {
        var server = injector.get(token_2.HTTP_SERVER);
        var port = (injector.get(token_1.APPLICATION_METADATA) || {}).port;
        global.hotHttpHost = injector.get(token_2.FORMAT_HOST_LISTEN)(port);
        global.hotHttpServer = server && server.listen(port, function () {
            console.log("The server is running at ".concat(global.hotHttpHost));
        });
    };
    return ExpressServerPlatform;
}());
exports.ExpressServerPlatform = ExpressServerPlatform;
