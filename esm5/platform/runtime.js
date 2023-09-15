import { createPlatformFactory } from '@fm/core/platform';
import { PLATFORM, PlatformOptions } from '@fm/core/token';
import { Injector } from '@fm/di';
import express from 'express';
import { createServer } from 'http';
import { HTTP_SERVER } from '../token';
import { applicationContext } from './decorator.core';
import { ExpressServerPlatform } from './index';
var _CORE_PLATFORM_PROVIDERS = [
    { provide: ExpressServerPlatform, deps: [PlatformOptions, Injector] },
    { provide: PLATFORM, useExisting: ExpressServerPlatform }
];
var _CORE_PROVIDERS = [
    { provide: express, useFactory: function () { return express(); } },
    { provide: HTTP_SERVER, useFactory: function (app) { return createServer(app); }, deps: [express] }
];
var createPlatform = createPlatformFactory(null, _CORE_PLATFORM_PROVIDERS);
applicationContext.registerStart(function () { return createPlatform(applicationContext).bootstrapStart([_CORE_PROVIDERS, applicationContext.providers]); });
export { PLATFORM_SCOPE } from '@fm/core/platform/application';
export var dynamicServer = function (port, providers) {
    if (providers === void 0) { providers = []; }
    return createPlatform(applicationContext, providers, { provide: PlatformOptions, useValue: port });
};
export { Application, Input, Prov } from './decorator.core';
