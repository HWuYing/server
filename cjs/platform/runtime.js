"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Application = exports.runtimeInjector = exports.registerProvider = exports.Prov = exports.Input = exports.createRegisterLoader = exports.ApplicationPlugin = exports.dynamicServer = exports.PLATFORM_SCOPE = void 0;
require("../db/manager");
require("../controller/manager");
var platform_1 = require("@fm/core/platform");
var application_1 = require("@fm/core/platform/application");
var token_1 = require("@fm/core/token");
var di_1 = require("@fm/di");
var index_1 = require("./index");
var applicationContext = new application_1.ApplicationContext();
var _CORE_PLATFORM_PROVIDERS = [
    { provide: index_1.ExpressServerPlatform, useClass: index_1.ExpressServerPlatform, deps: [token_1.PlatformOptions, di_1.Injector] },
    { provide: token_1.PLATFORM, useExisting: index_1.ExpressServerPlatform }
];
var createPlatform = (0, platform_1.createPlatformFactory)(null, _CORE_PLATFORM_PROVIDERS);
var application_2 = require("@fm/core/platform/application");
Object.defineProperty(exports, "PLATFORM_SCOPE", { enumerable: true, get: function () { return application_2.PLATFORM_SCOPE; } });
var dynamicServer = function (port, providers) {
    if (providers === void 0) { providers = []; }
    return createPlatform(applicationContext, providers, { provide: token_1.PlatformOptions, useValue: port });
};
exports.dynamicServer = dynamicServer;
applicationContext.registerStart(function () { return createPlatform(applicationContext).bootstrapStart(applicationContext.providers); });
var decorator_1 = require("@fm/core/platform/decorator");
Object.defineProperty(exports, "ApplicationPlugin", { enumerable: true, get: function () { return decorator_1.ApplicationPlugin; } });
Object.defineProperty(exports, "createRegisterLoader", { enumerable: true, get: function () { return decorator_1.createRegisterLoader; } });
Object.defineProperty(exports, "Input", { enumerable: true, get: function () { return decorator_1.Input; } });
Object.defineProperty(exports, "Prov", { enumerable: true, get: function () { return decorator_1.Prov; } });
Object.defineProperty(exports, "registerProvider", { enumerable: true, get: function () { return decorator_1.registerProvider; } });
Object.defineProperty(exports, "runtimeInjector", { enumerable: true, get: function () { return decorator_1.runtimeInjector; } });
exports.Application = applicationContext.makeApplicationDecorator();
