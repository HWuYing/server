import { Type } from '@fm/di';
export declare const InjectableRouter: (baseUrl?: string) => <T>(clazz: Type<T>) => Type<T>;
export declare const Post: (url: string) => (prototype: any, key: string) => void;
export declare const Get: (url: string) => (prototype: any, key: string) => void;
export declare const Delete: (url: string) => (prototype: any, key: string) => void;
export declare const Put: (url: string) => (prototype: any, key: string) => void;
export declare const All: (url: string) => (prototype: any, key: string) => void;
export declare const Param: (url: string) => (prototype: any, key: string) => void;
export declare const Use: (url: string) => (prototype: any, key: string) => void;
export declare const Options: (url: string) => (prototype: any, key: string) => void;
