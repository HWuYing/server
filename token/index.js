"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PORT = void 0;
const di_1 = require("@fm/di");
exports.PORT = di_1.InjectorToken.get('PORT');
