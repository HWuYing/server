"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Input = exports.Prov = exports.Application = exports.dynamicServer = exports.PLATFORM_SCOPE = void 0;
var platform_1 = require("@fm/core/platform");
var application_1 = require("@fm/core/platform/application");
var token_1 = require("@fm/core/token");
var di_1 = require("@fm/di");
var index_1 = require("./index");
var applicationContext = new application_1.ApplicationContext();
var _CORE_PLATFORM_PROVIDERS = [
    { provide: index_1.ExpressServerPlatform, deps: [token_1.PlatformOptions, di_1.Injector] },
    { provide: token_1.PLATFORM, useExisting: index_1.ExpressServerPlatform }
];
var createPlatform = (0, platform_1.createPlatformFactory)(null, _CORE_PLATFORM_PROVIDERS);
applicationContext.registerStart(function () { return createPlatform(applicationContext).bootstrapStart(applicationContext.providers); });
var application_2 = require("@fm/core/platform/application");
Object.defineProperty(exports, "PLATFORM_SCOPE", { enumerable: true, get: function () { return application_2.PLATFORM_SCOPE; } });
var dynamicServer = function (port, providers) {
    if (providers === void 0) { providers = []; }
    return createPlatform(applicationContext, providers, { provide: token_1.PlatformOptions, useValue: port });
};
exports.dynamicServer = dynamicServer;
exports.Application = applicationContext.makeApplicationDecorator();
exports.Prov = applicationContext.makeProvDecorator('MethodDecorator');
exports.Input = applicationContext.makePropInput('InputPropDecorator');
