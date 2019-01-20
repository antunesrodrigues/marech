"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sendError = function (message) {
    if (message === void 0) { message = ''; }
    throw new Error(message);
};
exports.default = sendError;
