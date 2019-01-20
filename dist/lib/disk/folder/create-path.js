"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var verify_path_1 = __importDefault(require("./verify-path"));
var createPath = function (location) {
    if (!verify_path_1.default(location)) {
        fs_1.default.mkdirSync(location);
    }
    return true;
};
exports.default = createPath;
