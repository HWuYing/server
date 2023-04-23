import { Provider, Type } from '@fm/di';
import { ExpressServerPlatform } from './platform';
export { PLATFORM_SCOPE } from '@fm/core/providers/platform';
export declare const dynamicServer: (port: number, providers?: Provider[]) => ExpressServerPlatform;
export declare const Application: <M extends import("../..").MetadataInfo>(metadata?: {
    [key: string]: any;
} | Type<M>) => <T = any>(cls: Type<T>) => Type<T>;
export declare const Prov: (token: import("../../../di").TokenKey, provider?: {
    [key: string]: any;
    providedIn?: string;
}) => any;
export declare const Input: (key: string) => any;
export declare const ControllerModel: (this: unknown, ...args: any[]) => (cls: Type<any>) => any;
