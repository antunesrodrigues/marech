"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var send_error_1 = __importDefault(require("../../final-user/error/send-error"));
var verify_path_1 = __importDefault(require("./verify-path"));
var existsPath = function (location, message) {
    if (message === void 0) { message = 'Path don\'t found'; }
    if (!verify_path_1.default(location)) {
        send_error_1.default(message);
    }
    return true;
};
exports.default = existsPath;
