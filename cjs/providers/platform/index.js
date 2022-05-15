"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dyanmicServer = void 0;
const platform_1 = require("./platform");
const dyanmicServer = (providers = []) => new platform_1.ExpressServerPlatform(providers);
exports.dyanmicServer = dyanmicServer;
