"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var send_error_1 = __importDefault(require("../../final-user/error/send-error"));
var verify_file_1 = __importDefault(require("./verify-file"));
var read_file_1 = __importDefault(require("./read-file"));
var requireFile = function (file, json, message) {
    if (json === void 0) { json = false; }
    if (!verify_file_1.default(file)) {
        var errorMessage = message || "File not found: " + path_1.default.parse(file).base;
        send_error_1.default(errorMessage);
    }
    var fileContent = read_file_1.default(file);
    var parsed = json ? JSON.parse(fileContent) : fileContent;
    return parsed;
};
exports.default = requireFile;
