"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.METADATA_CONFIG = exports.PROJECT_FOLDER = exports.SERVER_HANDLER = exports.HTTP_SERVER = exports.HTTP_HOST = void 0;
var di_1 = require("@hwy-fm/di");
exports.HTTP_HOST = di_1.InjectorToken.get('HTTP_SERVER');
exports.HTTP_SERVER = di_1.InjectorToken.get('HTTP_SERVER');
exports.SERVER_HANDLER = di_1.InjectorToken.get('SERVER_HANDLER');
exports.PROJECT_FOLDER = di_1.InjectorToken.get('PROJECT_FOLDER');
exports.METADATA_CONFIG = di_1.InjectorToken.get('METADATA_CONFIG');
