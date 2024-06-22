import '../db/manager';
import '../controller/manager';
import { createPlatformFactory } from '@fm/core/platform';
import { ApplicationContext } from '@fm/core/platform/application';
import { PLATFORM, PlatformOptions } from '@fm/core/token';
import { Injector } from '@fm/di';
import { ExpressServerPlatform } from './index';
var applicationContext = new ApplicationContext();
var _CORE_PLATFORM_PROVIDERS = [
    { provide: ExpressServerPlatform, useClass: ExpressServerPlatform, deps: [PlatformOptions, Injector] },
    { provide: PLATFORM, useExisting: ExpressServerPlatform }
];
var createPlatform = createPlatformFactory(null, _CORE_PLATFORM_PROVIDERS);
export { PLATFORM_SCOPE } from '@fm/core/platform/application';
export var dynamicServer = function (port, providers) {
    if (providers === void 0) { providers = []; }
    return createPlatform(applicationContext, providers, { provide: PlatformOptions, useValue: port });
};
applicationContext.registerStart(function () { return createPlatform(applicationContext).bootstrapStart(applicationContext.providers); });
export { ApplicationPlugin, Input, Prov, registerProvider } from '@fm/core/platform/decorator';
export var Application = applicationContext.makeApplicationDecorator();
