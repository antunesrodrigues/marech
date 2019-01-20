"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var createFile = function (file, data) {
    var content = data;
    if (Object.prototype.toString.call(data) === '[object Object]') {
        content = JSON.stringify(data, null, '  ');
    }
    content = content.toString();
    fs_1.default.writeFileSync(file, content);
};
exports.default = createFile;
