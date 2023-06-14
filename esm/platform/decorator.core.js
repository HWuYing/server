import { ApplicationContext } from '@fm/core/platform/application';
export const applicationContext = new ApplicationContext();
export const Application = applicationContext.makeApplicationDecorator();
export const Prov = applicationContext.makeProvDecorator('MethodDecorator');
export const Input = applicationContext.makePropInput('InputPropDecorator');
