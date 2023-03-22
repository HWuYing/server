import { ApplicationContext, createPlafformFactory, PlatformOptions } from '@fm/core/providers/platform';
import { PLATFORM } from '@fm/core/token';
import { Injector } from '@fm/di';
import { ExpressServerPlatform } from './platform';
const applicationContext = new ApplicationContext();
const _CORE_PLATFORM_PROVIDERS = [
    { provide: ExpressServerPlatform, deps: [PlatformOptions, Injector] },
    { provide: PLATFORM, useExisting: ExpressServerPlatform },
    { provide: ApplicationContext, useFactory: () => applicationContext }
];
const createPlatform = createPlafformFactory(null, _CORE_PLATFORM_PROVIDERS);
applicationContext.regeditStart(() => createPlatform(applicationContext).bootstrapStart(applicationContext.providers));
export { PLATFORM_SCOPE } from '@fm/core/providers/platform';
export const dyanmicServer = (port, providers = []) => {
    return createPlatform(applicationContext, providers, { provide: PlatformOptions, useValue: port });
};
export const Application = applicationContext.makeApplicationDecorator();
export const Prov = applicationContext.makeProvDecorator('MethodDecorator');
