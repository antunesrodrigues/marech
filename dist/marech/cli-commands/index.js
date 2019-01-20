"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var init_1 = __importDefault(require("./commands/init"));
var compile_1 = __importDefault(require("./commands/compile"));
exports.default = {
    init: init_1.default,
    compile: compile_1.default,
};
