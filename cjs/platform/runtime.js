"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Prov = exports.Input = exports.Application = exports.dynamicServer = exports.PLATFORM_SCOPE = void 0;
var tslib_1 = require("tslib");
var platform_1 = require("@fm/core/platform");
var token_1 = require("@fm/core/token");
var di_1 = require("@fm/di");
var express_1 = tslib_1.__importDefault(require("express"));
var http_1 = require("http");
var token_2 = require("../token");
var decorator_core_1 = require("./decorator.core");
var index_1 = require("./index");
var _CORE_PLATFORM_PROVIDERS = [
    { provide: index_1.ExpressServerPlatform, deps: [token_1.PlatformOptions, di_1.Injector] },
    { provide: token_1.PLATFORM, useExisting: index_1.ExpressServerPlatform }
];
var _CORE_PROVIDERS = [
    { provide: express_1.default, useFactory: function () { return (0, express_1.default)(); } },
    { provide: token_2.HTTP_SERVER, useFactory: function (app) { return (0, http_1.createServer)(app); }, deps: [express_1.default] }
];
var createPlatform = (0, platform_1.createPlatformFactory)(null, _CORE_PLATFORM_PROVIDERS);
decorator_core_1.applicationContext.registerStart(function () { return createPlatform(decorator_core_1.applicationContext).bootstrapStart([_CORE_PROVIDERS, decorator_core_1.applicationContext.providers]); });
var application_1 = require("@fm/core/platform/application");
Object.defineProperty(exports, "PLATFORM_SCOPE", { enumerable: true, get: function () { return application_1.PLATFORM_SCOPE; } });
var dynamicServer = function (port, providers) {
    if (providers === void 0) { providers = []; }
    return createPlatform(decorator_core_1.applicationContext, providers, { provide: token_1.PlatformOptions, useValue: port });
};
exports.dynamicServer = dynamicServer;
var decorator_core_2 = require("./decorator.core");
Object.defineProperty(exports, "Application", { enumerable: true, get: function () { return decorator_core_2.Application; } });
Object.defineProperty(exports, "Input", { enumerable: true, get: function () { return decorator_core_2.Input; } });
Object.defineProperty(exports, "Prov", { enumerable: true, get: function () { return decorator_core_2.Prov; } });
