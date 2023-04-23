"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControllerModel = exports.Input = exports.Prov = exports.Application = exports.dynamicServer = exports.PLATFORM_SCOPE = void 0;
var platform_1 = require("@fm/core/providers/platform");
var token_1 = require("@fm/core/token");
var di_1 = require("@fm/di");
var controller_1 = require("../../controller");
var platform_2 = require("./platform");
var _CORE_ROOT_PROVIDERS = [];
var _CORE_PLATFORM_PROVIDERS = [
    { provide: platform_2.ExpressServerPlatform, deps: [platform_1.PlatformOptions, di_1.Injector] },
    { provide: token_1.PLATFORM, useExisting: platform_2.ExpressServerPlatform }
];
var applicationContext = new platform_1.ApplicationContext(_CORE_PLATFORM_PROVIDERS, _CORE_ROOT_PROVIDERS);
var createPlatform = (0, platform_1.createPlatformFactory)(null);
applicationContext.registerStart(function () { return createPlatform(applicationContext).bootstrapStart(applicationContext.providers); });
var platform_3 = require("@fm/core/providers/platform");
Object.defineProperty(exports, "PLATFORM_SCOPE", { enumerable: true, get: function () { return platform_3.PLATFORM_SCOPE; } });
var dynamicServer = function (port, providers) {
    if (providers === void 0) { providers = []; }
    return createPlatform(applicationContext, providers, { provide: platform_1.PlatformOptions, useValue: port });
};
exports.dynamicServer = dynamicServer;
exports.Application = applicationContext.makeApplicationDecorator();
exports.Prov = applicationContext.makeProvDecorator('MethodDecorator');
exports.Input = applicationContext.makePropInput('InputPropDecorator');
exports.ControllerModel = (0, di_1.makeDecorator)('ControllerModel', undefined, function (type, controller) {
    (0, di_1.setInjectableDef)(type);
    _CORE_ROOT_PROVIDERS.push(controller_1.ControllerManager.getFactoryControlModel(type, { controller: controller }));
});
