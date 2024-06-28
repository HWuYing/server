import { Injector, InjectorToken } from '@fm/di';
export declare const ENTITY_TRANSFORM: InjectorToken;
export declare class EntityTransform {
    injector: Injector;
    transform(options: Record<string, any>): Record<string, any>;
    protected convert(options: Record<string, any>): Record<string, any>;
}
