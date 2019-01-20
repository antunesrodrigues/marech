"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var verify_path_1 = __importDefault(require("./verify-path"));
var exists_path_1 = __importDefault(require("./exists-path"));
var create_path_1 = __importDefault(require("./create-path"));
exports.default = {
    verifyPath: verify_path_1.default,
    existsPath: exists_path_1.default,
    createPath: create_path_1.default,
};
