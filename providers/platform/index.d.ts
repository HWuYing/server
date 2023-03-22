import { Provider } from '@fm/di';
import { ExpressServerPlatform } from './platform';
export { PLATFORM_SCOPE } from '@fm/core/providers/platform';
export declare const dyanmicServer: (port: number, providers?: Provider[]) => ExpressServerPlatform;
export declare const Application: (this: unknown, ...args: any[]) => (cls: import("@fm/di").Type<any>) => any;
export declare const Prov: (this: unknown, ...args: any[]) => any;
