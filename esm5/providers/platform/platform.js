import { __awaiter, __generator, __spreadArray } from "tslib";
import { Injector, INJECTOR_SCOPE } from '@fm/di';
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
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        app = express();
                        _a = this.parseParams(additionalProviders, start), _b = _a[0], providers = _b === void 0 ? [] : _b, _start = _a[1];
                        injector = this.beforeBootstrapStart([providers, { provide: express, useValue: app }]);
                        return [4 /*yield*/, _start(injector).then(function () { return _this.listen(_this.port, app); })];
                    case 1:
                        _c.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ExpressServerPlatform.prototype.beforeBootstrapStart = function (providers) {
        if (providers === void 0) { providers = []; }
        return Injector.create([{ provide: INJECTOR_SCOPE, useValue: 'root' }, providers], this.platformInjector);
    };
    ExpressServerPlatform.prototype.parseParams = function (providers, start) {
        return typeof providers === 'function' ? [[], providers] : [__spreadArray([], providers, true), start];
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
