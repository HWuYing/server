import { Injector } from '@fm/di';
export declare class AttributeMapping {
    injector: Injector;
    attribute(options: Record<string, any>): Record<string, any>;
    protected convert(options: Record<string, any>): Record<string, any>;
}
