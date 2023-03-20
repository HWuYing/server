import { Injector } from '@fm/di';
import { createPlafformFactory, PlatformOptions } from '@fm/core/providers/platform';
import { PLATFORM } from '@fm/core/token';
import { ExpressServerPlatform } from './platform';
const _CORE_PLATFORM_PROVIDERS = [
    { provide: ExpressServerPlatform, deps: [PlatformOptions, Injector] },
    { provide: PLATFORM, useExisting: ExpressServerPlatform }
];
const createPlatform = createPlafformFactory(null, _CORE_PLATFORM_PROVIDERS);
export const dyanmicServer = (port, providers = []) => {
    return createPlatform(providers, { provide: PlatformOptions, useValue: port });
};
