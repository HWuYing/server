export class DataError extends Error {
    constructor(code, message) {
        super(message);
        this.code = code;
    }
}
