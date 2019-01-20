"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var send_error_1 = __importDefault(require("../../final-user/error/send-error"));
var verify_file_1 = __importDefault(require("./verify-file"));
var readFile = function (file) {
    if (verify_file_1.default(file)) {
        return fs_1.default.readFileSync(file, 'utf-8');
    }
    send_error_1.default("File not found: " + file);
    return '';
};
exports.default = readFile;
