"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var verify_file_1 = __importDefault(require("./verify-file"));
var read_file_1 = __importDefault(require("./read-file"));
var require_file_1 = __importDefault(require("./require-file"));
var create_file_1 = __importDefault(require("./create-file"));
exports.default = {
    verifyFile: verify_file_1.default,
    readFile: read_file_1.default,
    requireFile: require_file_1.default,
    createFile: create_file_1.default,
};
