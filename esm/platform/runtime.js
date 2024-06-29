import '../db/manager';
import '../controller/manager';
import { createPlatformFactory } from '@fm/core/platform';
import { ApplicationContext } from '@fm/core/platform/application';
import { PLATFORM, PlatformOptions } from '@fm/core/token';
import { Injector } from '@fm/di';
import { ExpressServerPlatform } from './index';
const applicationContext = new ApplicationContext();
const _CORE_PLATFORM_PROVIDERS = [
    { provide: ExpressServerPlatform, useClass: ExpressServerPlatform, deps: [PlatformOptions, Injector] },
    { provide: PLATFORM, useExisting: ExpressServerPlatform }
];
const createPlatform = createPlatformFactory(null, _CORE_PLATFORM_PROVIDERS);
export { PLATFORM_SCOPE } from '@fm/core/platform/application';
export const dynamicServer = (port, providers = []) => {
    return createPlatform(applicationContext, providers, { provide: PlatformOptions, useValue: port });
};
applicationContext.registerStart(() => createPlatform(applicationContext).bootstrapStart(applicationContext.providers));
export { ApplicationPlugin, createRegisterLoader, Input, Prov, registerProvider, runtimeInjector } from '@fm/core/platform/decorator';
export const Application = applicationContext.makeApplicationDecorator();
