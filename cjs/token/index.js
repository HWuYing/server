"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SERVER_HANDLER = exports.HTTP_SERVER = void 0;
var di_1 = require("@hwy-fm/di");
exports.HTTP_SERVER = di_1.InjectorToken.get('HTTP_SERVER');
exports.SERVER_HANDLER = di_1.InjectorToken.get('SERVER_HANDLER');
