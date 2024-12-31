"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QUEUE = exports.MIDDLEWARE = exports.PROXY = void 0;
var di_1 = require("@hwy-fm/di");
exports.PROXY = 'HTTP_PROXY';
exports.MIDDLEWARE = 'HTTP_PROXY_MIDDLEWARE';
exports.QUEUE = di_1.InjectorToken.get('HTTP_PROXY_QUEUE');
