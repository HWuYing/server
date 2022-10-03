import { ExpressServerPlatform } from './platform';
export const dyanmicServer = (port, providers = []) => new ExpressServerPlatform(port, providers);
