"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var disk_1 = __importDefault(require("./disk"));
var final_user_1 = __importDefault(require("./final-user"));
var functions_1 = __importDefault(require("./functions"));
var marech_helpers_1 = __importDefault(require("./marech-helpers"));
var padroes_1 = __importDefault(require("./padroes"));
var itens = {
    disk: disk_1.default,
    finalUser: final_user_1.default,
    functions: functions_1.default,
    marechHelpers: marech_helpers_1.default,
    padroes: padroes_1.default,
};
exports.default = itens;
