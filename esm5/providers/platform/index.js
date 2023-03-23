import { ApplicationContext, createPlafformFactory, PlatformOptions } from '@fm/core/providers/platform';
import { PLATFORM } from '@fm/core/token';
import { Injector } from '@fm/di';
import { ExpressServerPlatform } from './platform';
var applicationContext = new ApplicationContext();
var _CORE_PLATFORM_PROVIDERS = [
    { provide: ExpressServerPlatform, deps: [PlatformOptions, Injector] },
    { provide: PLATFORM, useExisting: ExpressServerPlatform },
    { provide: ApplicationContext, useFactory: function () { return applicationContext; } }
];
var createPlatform = createPlafformFactory(null, _CORE_PLATFORM_PROVIDERS);
applicationContext.regeditStart(function () { return createPlatform(applicationContext).bootstrapStart(applicationContext.providers); });
export { PLATFORM_SCOPE } from '@fm/core/providers/platform';
export var dyanmicServer = function (port, providers) {
    if (providers === void 0) { providers = []; }
    return createPlatform(applicationContext, providers, { provide: PlatformOptions, useValue: port });
};
export var Application = applicationContext.makeApplicationDecorator();
export var Prov = applicationContext.makeProvDecorator('MethodDecorator');
export var Input = applicationContext.makePropInput('InputPropDecorator');
