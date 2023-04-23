import { ApplicationContext, createPlatformFactory, PlatformOptions } from '@fm/core/providers/platform';
import { PLATFORM } from '@fm/core/token';
import { Injector, makeDecorator, setInjectableDef } from '@fm/di';
import { ControllerManager } from '../../controller';
import { ExpressServerPlatform } from './platform';
const _CORE_ROOT_PROVIDERS = [];
const _CORE_PLATFORM_PROVIDERS = [
    { provide: ExpressServerPlatform, deps: [PlatformOptions, Injector] },
    { provide: PLATFORM, useExisting: ExpressServerPlatform }
];
const applicationContext = new ApplicationContext(_CORE_PLATFORM_PROVIDERS, _CORE_ROOT_PROVIDERS);
const createPlatform = createPlatformFactory(null);
applicationContext.registerStart(() => createPlatform(applicationContext).bootstrapStart(applicationContext.providers));
export { PLATFORM_SCOPE } from '@fm/core/providers/platform';
export const dynamicServer = (port, providers = []) => {
    return createPlatform(applicationContext, providers, { provide: PlatformOptions, useValue: port });
};
export const Application = applicationContext.makeApplicationDecorator();
export const Prov = applicationContext.makeProvDecorator('MethodDecorator');
export const Input = applicationContext.makePropInput('InputPropDecorator');
export const ControllerModel = makeDecorator('ControllerModel', undefined, (type, controller) => {
    setInjectableDef(type);
    _CORE_ROOT_PROVIDERS.push(ControllerManager.getFactoryControlModel(type, { controller }));
});
