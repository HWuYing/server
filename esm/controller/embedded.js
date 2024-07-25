export class Embedded {
    constructor(embedded, args) {
        this.embedded = embedded;
        this.args = args;
    }
}
export const embedded = (...params) => {
    return new Embedded(params.pop(), params);
};
