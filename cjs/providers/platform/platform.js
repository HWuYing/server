"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpressServerPlatform = void 0;
var tslib_1 = require("tslib");
var di_1 = require("@fm/di");
var express_1 = tslib_1.__importDefault(require("express"));
var http_1 = require("http");
var ExpressServerPlatform = /** @class */ (function () {
    function ExpressServerPlatform(port, providers) {
        this.port = port;
        this.providers = providers;
        this.rootInjector = (0, di_1.getProvider)(di_1.Injector);
    }
    ExpressServerPlatform.prototype.bootstrapStart = function (start) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var app, injector;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        app = (0, express_1.default)();
                        injector = this.beforeBootstrapStart([{ provide: express_1.default, useValue: app }]);
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
        var injector = new di_1.StaticInjector(this.rootInjector, { isScope: 'self' });
        tslib_1.__spreadArray(tslib_1.__spreadArray([], this.providers, true), providers, true).forEach(function (provider) { return injector.set(provider.provide, provider); });
        return injector;
    };
    ExpressServerPlatform.prototype.listen = function (port, app) {
        global.hotHttpHost = "http://localhost:".concat(port, "/");
        global.hotHttpServer = (0, http_1.createServer)(app).listen(port, function () {
            console.log("The server is running at ".concat(global.hotHttpHost));
        });
    };
    return ExpressServerPlatform;
}());
exports.ExpressServerPlatform = ExpressServerPlatform;
