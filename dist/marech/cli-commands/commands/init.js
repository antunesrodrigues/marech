"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var inquirer_1 = __importDefault(require("inquirer"));
var lib_1 = __importDefault(require("../../../lib"));
var marechal_configs_1 = __importDefault(require("../../marechal/marechal-configs"));
var questions = [
    {
        type: 'input',
        name: 'input',
        message: 'Folder to source-code',
        default: 'src',
    },
    {
        type: 'input',
        name: 'telegs',
        message: 'Folder to marech source-code',
        default: 'src/marech',
    },
    {
        type: 'input',
        name: 'output',
        message: 'Folder to final-code',
        default: 'dist',
    },
    {
        type: 'input',
        name: 'filename',
        message: 'Configuration filename',
        default: 'marech-config',
    },
];
var init = function (commander) {
    commander
        .command('init [dir]')
        .alias('i')
        .description('Initialize marech')
        .option('-y, --yes', 'Use default answers')
        .action(function (dir, opt) {
        var configs = marechal_configs_1.default.defaultConfigs();
        var filename = marechal_configs_1.default.defaultNames.filename;
        var workDir = './';
        if (dir) {
            if (lib_1.default.disk.folder.createPath(path_1.default.resolve(dir))) {
                workDir = dir;
            }
        }
        else {
            workDir = path_1.default.resolve(workDir);
        }
        if (!opt.yes) {
            inquirer_1.default.prompt(questions)
                .then(function (answers) {
                configs = marechal_configs_1.default.simpleConfig(answers);
                (filename = answers.filename);
                lib_1.default.disk.file.createFile(path_1.default.join(workDir, filename + ".json"), configs);
            });
        }
        else {
            lib_1.default.disk.file.createFile(path_1.default.join(workDir, filename + ".json"), configs);
        }
    });
};
exports.default = init;
