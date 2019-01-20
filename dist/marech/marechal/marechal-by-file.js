"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var lib_1 = __importDefault(require("../../lib"));
var marechal_by_text_1 = __importDefault(require("./marechal-by-text"));
var byFile = function (file, relativeConfigs, resolvedConfigs) {
    var originalData = lib_1.default.disk.file.readFile(path_1.default.resolve(file));
    var finalData = marechal_by_text_1.default(originalData, resolvedConfigs);
    return finalData;
};
var byFileAndCreate = function (workDir, file, relativeConfigs, resolvedConfigs) {
    var finalData = byFile(file, relativeConfigs, relativeConfigs);
    var fileName = path_1.default.join(file).replace(path_1.default.join(workDir, relativeConfigs.input.path), '');
    var finalFileName = path_1.default.join(resolvedConfigs.output, path_1.default.normalize(fileName));
    lib_1.default.disk.folder.createPath(path_1.default.parse(finalFileName).dir);
    lib_1.default.disk.file.createFile(finalFileName, finalData);
};
exports.default = {
    byFile: byFile,
    byFileAndCreate: byFileAndCreate,
};
