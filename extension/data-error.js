"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataError = void 0;
class DataError extends Error {
    code;
    constructor(code, message) {
        super(message);
        this.code = code;
    }
}
exports.DataError = DataError;
