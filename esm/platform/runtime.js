import { createPlatformFactory } from '@hwy-fm/core/platform';
import { makeApplication } from '@hwy-fm/core/platform/decorator';
import { PLATFORM } from '@hwy-fm/core/token';
import { Injector } from '@hwy-fm/di';
import { ExpressServerPlatform } from './index';
export { PLATFORM_SCOPE } from '@hwy-fm/core/platform';
export { ApplicationPlugin, createRegisterLoader, Input, Prov, Register, runtimeInjector } from '@hwy-fm/core/platform/decorator';
export const Application = makeApplication((applicationContext) => {
    const createPlatform = createPlatformFactory(null, [
        { provide: ExpressServerPlatform, useClass: ExpressServerPlatform, deps: [Injector] },
        { provide: PLATFORM, useExisting: ExpressServerPlatform }
    ]);
    createPlatform(applicationContext).bootstrapStart(applicationContext.providers);
});
