"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dyanmicServer = void 0;
const platform_1 = require("./platform");
const dyanmicServer = (port, providers = []) => new platform_1.ExpressServerPlatform(port, providers);
exports.dyanmicServer = dyanmicServer;
