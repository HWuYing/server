import { createPlatformFactory } from '@hwy-fm/core/platform';
import { makeApplication } from '@hwy-fm/core/platform/decorator';
import { PLATFORM } from '@hwy-fm/core/token';
import { Injector } from '@hwy-fm/di';
import { METADATA_CONFIG, PROJECT_FOLDER } from '../token';
import { ExpressServerPlatform } from './index';
import { Metadata } from './metadata';
export { PLATFORM_SCOPE } from '@hwy-fm/core/platform';
export { ApplicationPlugin, createRegisterLoader, Input, Prov, Register, runtimeInjector } from '@hwy-fm/core/platform/decorator';
export const Application = (metadata) => makeApplication((applicationContext) => {
    const createPlatform = createPlatformFactory(null, [
        { provide: PROJECT_FOLDER, useValue: process.cwd() },
        { provide: ExpressServerPlatform, useClass: ExpressServerPlatform, deps: [Injector] },
        { provide: PLATFORM, useExisting: ExpressServerPlatform },
        { provide: METADATA_CONFIG, useValue: metadata || {} }
    ]);
    createPlatform(applicationContext).bootstrapStart(applicationContext.providers);
})(Metadata);
