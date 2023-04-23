import { ApplicationContext, createPlatformFactory, PlatformOptions } from '@fm/core/providers/platform';
import { PLATFORM } from '@fm/core/token';
import { Injector, makeDecorator, setInjectableDef } from '@fm/di';
import { ControllerManager } from '../../controller';
import { ExpressServerPlatform } from './platform';
var _CORE_ROOT_PROVIDERS = [];
var _CORE_PLATFORM_PROVIDERS = [
    { provide: ExpressServerPlatform, deps: [PlatformOptions, Injector] },
    { provide: PLATFORM, useExisting: ExpressServerPlatform }
];
var applicationContext = new ApplicationContext(_CORE_PLATFORM_PROVIDERS, _CORE_ROOT_PROVIDERS);
var createPlatform = createPlatformFactory(null);
applicationContext.registerStart(function () { return createPlatform(applicationContext).bootstrapStart(applicationContext.providers); });
export { PLATFORM_SCOPE } from '@fm/core/providers/platform';
export var dynamicServer = function (port, providers) {
    if (providers === void 0) { providers = []; }
    return createPlatform(applicationContext, providers, { provide: PlatformOptions, useValue: port });
};
export var Application = applicationContext.makeApplicationDecorator();
export var Prov = applicationContext.makeProvDecorator('MethodDecorator');
export var Input = applicationContext.makePropInput('InputPropDecorator');
export var ControllerModel = makeDecorator('ControllerModel', undefined, function (type, controller) {
    setInjectableDef(type);
    _CORE_ROOT_PROVIDERS.push(ControllerManager.getFactoryControlModel(type, { controller: controller }));
});
