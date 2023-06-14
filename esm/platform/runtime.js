import { createPlatformFactory } from '@fm/core/platform';
import { PLATFORM, PlatformOptions } from '@fm/core/token';
import { Injector } from '@fm/di';
import { applicationContext } from './decorator.core';
import { ExpressServerPlatform } from './index';
const _CORE_PLATFORM_PROVIDERS = [
    { provide: ExpressServerPlatform, deps: [PlatformOptions, Injector] },
    { provide: PLATFORM, useExisting: ExpressServerPlatform }
];
const createPlatform = createPlatformFactory(null, _CORE_PLATFORM_PROVIDERS);
applicationContext.registerStart(() => createPlatform(applicationContext).bootstrapStart(applicationContext.providers));
export { PLATFORM_SCOPE } from '@fm/core/platform/application';
export const dynamicServer = (port, providers = []) => {
    return createPlatform(applicationContext, providers, { provide: PlatformOptions, useValue: port });
};
export { Application, Input, Prov } from './decorator.core';
