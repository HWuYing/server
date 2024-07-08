import { Injector } from '@hwy-fm/di';
export declare class EntityTransform {
    injector: Injector;
    transform(options: Record<string, any>): Record<string, any>;
    protected convert(options: Record<string, any>): Record<string, any>;
}
