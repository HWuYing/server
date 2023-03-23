"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Input = exports.Prov = exports.Application = exports.dyanmicServer = exports.PLATFORM_SCOPE = void 0;
var platform_1 = require("@fm/core/providers/platform");
var token_1 = require("@fm/core/token");
var di_1 = require("@fm/di");
var platform_2 = require("./platform");
var applicationContext = new platform_1.ApplicationContext();
var _CORE_PLATFORM_PROVIDERS = [
    { provide: platform_2.ExpressServerPlatform, deps: [platform_1.PlatformOptions, di_1.Injector] },
    { provide: token_1.PLATFORM, useExisting: platform_2.ExpressServerPlatform },
    { provide: platform_1.ApplicationContext, useFactory: function () { return applicationContext; } }
];
var createPlatform = (0, platform_1.createPlafformFactory)(null, _CORE_PLATFORM_PROVIDERS);
applicationContext.regeditStart(function () { return createPlatform(applicationContext).bootstrapStart(applicationContext.providers); });
var platform_3 = require("@fm/core/providers/platform");
Object.defineProperty(exports, "PLATFORM_SCOPE", { enumerable: true, get: function () { return platform_3.PLATFORM_SCOPE; } });
var dyanmicServer = function (port, providers) {
    if (providers === void 0) { providers = []; }
    return createPlatform(applicationContext, providers, { provide: platform_1.PlatformOptions, useValue: port });
};
exports.dyanmicServer = dyanmicServer;
exports.Application = applicationContext.makeApplicationDecorator();
exports.Prov = applicationContext.makeProvDecorator('MethodDecorator');
exports.Input = applicationContext.makePropInput('InputPropDecorator');
