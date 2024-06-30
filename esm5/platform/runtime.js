import '../db/manager';
import '../controller/manager';
import { createPlatformFactory } from '@fm/core/platform';
import { makeApplication } from '@fm/core/platform/decorator';
import { PLATFORM, PlatformOptions } from '@fm/core/token';
import { Injector } from '@fm/di';
import { ExpressServerPlatform } from './index';
export { PLATFORM_SCOPE } from '@fm/core/platform';
export { ApplicationPlugin, createRegisterLoader, Input, Prov, Register, runtimeInjector } from '@fm/core/platform/decorator';
export var Application = makeApplication(function (applicationContext) {
    var createPlatform = createPlatformFactory(null, [
        { provide: ExpressServerPlatform, useClass: ExpressServerPlatform, deps: [PlatformOptions, Injector] },
        { provide: PLATFORM, useExisting: ExpressServerPlatform }
    ]);
    createPlatform(applicationContext).bootstrapStart(applicationContext.providers);
});
