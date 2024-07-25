var Embedded = /** @class */ (function () {
    function Embedded(embedded, args) {
        this.embedded = embedded;
        this.args = args;
    }
    return Embedded;
}());
export { Embedded };
export var embedded = function () {
    var params = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        params[_i] = arguments[_i];
    }
    return new Embedded(params.pop(), params);
};
