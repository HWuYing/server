"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Prov = exports.Input = exports.Application = exports.dynamicServer = exports.PLATFORM_SCOPE = void 0;
var platform_1 = require("@fm/core/platform");
var token_1 = require("@fm/core/token");
var di_1 = require("@fm/di");
var decorator_core_1 = require("./decorator.core");
var index_1 = require("./index");
var _CORE_PLATFORM_PROVIDERS = [
    { provide: index_1.ExpressServerPlatform, useClass: index_1.ExpressServerPlatform, deps: [token_1.PlatformOptions, di_1.Injector] },
    { provide: token_1.PLATFORM, useExisting: index_1.ExpressServerPlatform }
];
var createPlatform = (0, platform_1.createPlatformFactory)(null, _CORE_PLATFORM_PROVIDERS);
decorator_core_1.applicationContext.registerStart(function () { return createPlatform(decorator_core_1.applicationContext).bootstrapStart(decorator_core_1.applicationContext.providers); });
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
