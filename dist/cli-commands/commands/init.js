"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var inquirer_1 = __importDefault(require("inquirer"));
var marechal_configs_1 = __importDefault(require("marech-core/dist/marechal/marechal-configs"));
var questions = [
    {
        type: 'input',
        name: 'input',
        message: 'Input folder',
        default: 'src',
    },
    {
        type: 'input',
        name: 'components',
        message: 'Component\'s folder',
        default: 'src/marech',
    },
    {
        type: 'input',
        name: 'output',
        message: 'Output folder',
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
            if (!fs_1.default.existsSync(path_1.default.resolve(dir))) {
                fs_1.default.mkdirSync(path_1.default.resolve(dir));
            }
            workDir = dir;
        }
        else {
            workDir = path_1.default.resolve(workDir);
        }
        if (!opt.yes) {
            inquirer_1.default.prompt(questions)
                .then(function (answers) {
                configs = marechal_configs_1.default.simpleConfig(answers);
                (filename = answers.filename);
                var configStr = JSON.stringify(configs, null, '  ');
                fs_1.default.writeFileSync(path_1.default.join(workDir, filename + ".json"), configStr);
            });
        }
        else {
            var configStr = JSON.stringify(configs, null, '  ');
            fs_1.default.writeFileSync(path_1.default.join(workDir, filename + ".json"), configStr);
        }
    });
};
exports.default = init;
