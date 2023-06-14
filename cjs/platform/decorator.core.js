"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Input = exports.Prov = exports.Application = exports.applicationContext = void 0;
var application_1 = require("@fm/core/platform/application");
exports.applicationContext = new application_1.ApplicationContext();
exports.Application = exports.applicationContext.makeApplicationDecorator();
exports.Prov = exports.applicationContext.makeProvDecorator('MethodDecorator');
exports.Input = exports.applicationContext.makePropInput('InputPropDecorator');
