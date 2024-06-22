import '../db/manager';
import '../controller/manager';
import { Provider } from '@fm/di';
import { ExpressServerPlatform } from './index';
export { PLATFORM_SCOPE } from '@fm/core/platform/application';
export declare const dynamicServer: (port: number | undefined, providers?: Provider[]) => ExpressServerPlatform;
export { ApplicationPlugin, Input, Prov, registerProvider } from '@fm/core/platform/decorator';
export declare const Application: <M extends import("@fm/core/platform/application").MetadataInfo>(metadata?: {
    [key: string]: any;
} | import("@fm/di").Type<M>) => <T = any>(cls: import("@fm/di").Type<T>) => import("@fm/di").Type<T>;
