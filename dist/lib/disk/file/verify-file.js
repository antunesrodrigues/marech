"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var verifyFile = function (file) {
    var fileName = path_1.default.normalize(file);
    var exists = fs_1.default.existsSync(fileName);
    if (!exists) {
        return false;
    }
    return true;
};
exports.default = verifyFile;
