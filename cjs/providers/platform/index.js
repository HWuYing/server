"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dyanmicServer = void 0;
var di_1 = require("@fm/di");
var platform_1 = require("@fm/core/providers/platform");
var token_1 = require("@fm/core/token");
var platform_2 = require("./platform");
var _CORE_PLATFORM_PROVIDERS = [
    { provide: platform_2.ExpressServerPlatform, deps: [platform_1.PlatformOptions, di_1.Injector] },
    { provide: token_1.PLATFORM, useExisting: platform_2.ExpressServerPlatform }
];
var createPlatform = (0, platform_1.createPlafformFactory)(null, _CORE_PLATFORM_PROVIDERS);
var dyanmicServer = function (port, providers) {
    if (providers === void 0) { providers = []; }
    return createPlatform(providers, { provide: platform_1.PlatformOptions, useValue: port });
};
exports.dyanmicServer = dyanmicServer;
