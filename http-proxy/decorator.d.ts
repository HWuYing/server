import { type Type } from '@hwy-fm/di';
import type { Options } from 'http-proxy-middleware';
import { type ProxyOptions } from './register';
export declare const HttpProxy: (host: string, options?: Options<import("http").IncomingMessage, import("http").ServerResponse<import("http").IncomingMessage>> | Type<ProxyOptions>) => MethodDecorator;
export declare const HttpMiddleware: () => MethodDecorator;
