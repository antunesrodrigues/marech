"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var glob_1 = __importDefault(require("glob"));
var marechal_by_file_1 = __importDefault(require("marech-core/dist/marechal/marechal-by-file"));
var marechal_configs_1 = __importDefault(require("marech-core/dist/marechal/marechal-configs"));
var compile = function (commander) {
    commander
        .command('compile [dir]')
        .alias('c')
        .description('Compile marech')
        .option('-c, --config [filename]', 'Set custom marech-config file')
        .action(function (dir, opt) {
        var configFile = './marech-config.json';
        var workDir = './';
        if (opt.config && typeof opt.config !== 'boolean') {
            configFile = opt.config;
        }
        if (dir) {
            if (fs_1.default.existsSync(path_1.default.resolve(dir))) {
                workDir = dir;
            }
        }
        else {
            workDir = path_1.default.resolve(workDir);
        }
        var resolvedConfigFile = path_1.default.join(process.cwd(), configFile);
        var userConfigs = JSON.parse(fs_1.default.readFileSync(resolvedConfigFile, 'utf-8'));
        var relativeConfigs = marechal_configs_1.default.mergeConfigs(userConfigs);
        var resolvedConfigs = marechal_configs_1.default.resolveConfig(relativeConfigs, workDir);
        var filesLocation = path_1.default.join(workDir, relativeConfigs.input.path);
        var fullFilesLocation = path_1.default.join(filesLocation, relativeConfigs.input.files);
        var componetsFiles = path_1.default.join(workDir, relativeConfigs.components.path, '/**/*.html');
        var ignoreFiles = { ignore: componetsFiles };
        glob_1.default(fullFilesLocation, ignoreFiles, function (err, files) {
            if (err)
                throw err;
            files.forEach(function (file) {
                marechal_by_file_1.default.byFileAndCreate(workDir, file, relativeConfigs, resolvedConfigs);
                var onlyFileName = path_1.default.relative(relativeConfigs.input.path, file);
                console.info(onlyFileName + " - OK!");
            });
            console.info("\nOutput: " + relativeConfigs.output.path);
        });
    });
};
exports.default = compile;
