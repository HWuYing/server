import { ApplicationContext } from '@fm/core/platform/application';
export declare const applicationContext: ApplicationContext;
export declare const Application: <M extends import("@fm/core/platform/application").MetadataInfo>(metadata?: {
    [key: string]: any;
} | import("../../di").Type<M>) => <T = any>(cls: import("../../di").Type<T>) => import("../../di").Type<T>;
export declare const Prov: (token: import("../../di").TokenKey, provider?: {
    [key: string]: any;
    providedIn?: string;
}) => any;
export declare const Input: (key: string) => any;
