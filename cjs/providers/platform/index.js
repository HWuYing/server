"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dyanmicServer = void 0;
var platform_1 = require("./platform");
var dyanmicServer = function (port, providers) {
    if (providers === void 0) { providers = []; }
    return new platform_1.ExpressServerPlatform(port, providers);
};
exports.dyanmicServer = dyanmicServer;
