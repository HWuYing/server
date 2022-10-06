import { ExpressServerPlatform } from './platform';
export var dyanmicServer = function (port, providers) {
    if (providers === void 0) { providers = []; }
    return new ExpressServerPlatform(port, providers);
};
