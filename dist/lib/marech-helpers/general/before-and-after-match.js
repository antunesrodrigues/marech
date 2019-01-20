"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var matchFunctions = {
    before: function (text, match) {
        return text.slice(0, match.index);
    },
    after: function (text, match) {
        return text.slice(match.index + match[0].length);
    },
};
exports.default = matchFunctions;
