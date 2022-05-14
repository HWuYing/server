import { ExpressServerPlatform } from './platform';
export const dyanmicServer = (providers = []) => new ExpressServerPlatform(providers);
