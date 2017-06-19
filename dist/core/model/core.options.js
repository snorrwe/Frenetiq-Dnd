"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultOptions = {
    isDisabled: false
};
exports.getDefaultOptionsCopy = function () {
    var result = {};
    var keys = Object.keys(exports.DefaultOptions);
    for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
        var key = keys_1[_i];
        result[key] = exports.DefaultOptions[key];
    }
    return result;
};
//# sourceMappingURL=core.options.js.map