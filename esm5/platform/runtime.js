import { createPlatformFactory } from '@fm/core/platform';
import { PLATFORM, PlatformOptions } from '@fm/core/token';
import { Injector } from '@fm/di';
import { applicationContext } from './decorator.core';
import { ExpressServerPlatform } from './index';
var _CORE_PLATFORM_PROVIDERS = [
    { provide: ExpressServerPlatform, useClass: ExpressServerPlatform, deps: [PlatformOptions, Injector] },
    { provide: PLATFORM, useExisting: ExpressServerPlatform }
];
var createPlatform = createPlatformFactory(null, _CORE_PLATFORM_PROVIDERS);
applicationContext.registerStart(function () { return createPlatform(applicationContext).bootstrapStart(applicationContext.providers); });
export { PLATFORM_SCOPE } from '@fm/core/platform/application';
export var dynamicServer = function (port, providers) {
    if (providers === void 0) { providers = []; }
    return createPlatform(applicationContext, providers, { provide: PlatformOptions, useValue: port });
};
export { Application, Input, Prov } from './decorator.core';
