"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var verifyPath = function (location) {
    var finalPath = path_1.default.normalize(location);
    var exists = fs_1.default.existsSync(finalPath);
    return exists;
};
exports.default = verifyPath;
