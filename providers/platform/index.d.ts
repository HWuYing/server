import { Provider } from '@fm/di';
import { ExpressServerPlatform } from './platform';
export { PLATFORM_SCOPE } from '@fm/core/providers/platform';
export declare const dynamicServer: (port: number, providers?: Provider[]) => ExpressServerPlatform;
export declare const Application: <M extends import("../..").MetadataInfo>(metadata: {
    [key: string]: Record<string, any>;
} | import("../../../di").Type<M>) => <T = any>(cls: import("../../../di").Type<T>) => import("../../../di").Type<T>;
export declare const Prov: (token: import("../../../di").TokenKey, provider?: {
    [key: string]: any;
    providedIn?: string;
}) => any;
export declare const Input: (key: string) => any;
