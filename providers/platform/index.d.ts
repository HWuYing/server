import { Provider } from '@fm/di';
import { ExpressServerPlatform } from './platform';
export declare const dyanmicServer: (port: number, providers?: Provider[]) => ExpressServerPlatform;
