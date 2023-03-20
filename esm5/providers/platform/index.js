import { Injector } from '@fm/di';
import { createPlafformFactory, PlatformOptions } from '@fm/core/providers/platform';
import { PLATFORM } from '@fm/core/token';
import { ExpressServerPlatform } from './platform';
var _CORE_PLATFORM_PROVIDERS = [
    { provide: ExpressServerPlatform, deps: [PlatformOptions, Injector] },
    { provide: PLATFORM, useExisting: ExpressServerPlatform }
];
var createPlatform = createPlafformFactory(null, _CORE_PLATFORM_PROVIDERS);
export var dyanmicServer = function (port, providers) {
    if (providers === void 0) { providers = []; }
    return createPlatform(providers, { provide: PlatformOptions, useValue: port });
};
