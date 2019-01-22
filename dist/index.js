#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var commander_1 = __importDefault(require("commander"));
var cli_commands_1 = __importDefault(require("./cli-commands"));
var packageLocation = path_1.default.join(__dirname, '../package.json');
var info = require(packageLocation);
commander_1.default
    .version(info.version);
cli_commands_1.default.init(commander_1.default);
cli_commands_1.default.compile(commander_1.default);
commander_1.default.parse(process.argv);
if (!process.argv.slice(2).length) {
    commander_1.default.outputHelp();
}
