import { type MetadataInfo } from './metadata';
export { PLATFORM_SCOPE } from '@hwy-fm/core/platform';
export { ApplicationPlugin, createRegisterLoader, Input, Prov, Register, runtimeInjector } from '@hwy-fm/core/platform/decorator';
export declare const Application: (metadata?: MetadataInfo) => import("../../di/decorators").ClassDecorator<any>;
