"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var file_1 = __importDefault(require("./file"));
var folder_1 = __importDefault(require("./folder"));
var itens = {
    file: file_1.default,
    folder: folder_1.default,
};
exports.default = itens;
