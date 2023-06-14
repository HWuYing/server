import { Provider } from '@fm/di';
import { ExpressServerPlatform } from './index';
export { PLATFORM_SCOPE } from '@fm/core/platform/application';
export declare const dynamicServer: (port: number, providers?: Provider[]) => ExpressServerPlatform;
export { Application, Input, Prov } from './decorator.core';
