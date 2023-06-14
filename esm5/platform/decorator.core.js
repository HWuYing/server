import { ApplicationContext } from '@fm/core/platform/application';
export var applicationContext = new ApplicationContext();
export var Application = applicationContext.makeApplicationDecorator();
export var Prov = applicationContext.makeProvDecorator('MethodDecorator');
export var Input = applicationContext.makePropInput('InputPropDecorator');
