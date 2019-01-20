"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var defaultNames = {
    filename: 'marechal-config',
};
var defaultConfigs = function (input, output, teleg) {
    if (input === void 0) { input = 'src'; }
    if (output === void 0) { output = 'dist'; }
    if (teleg === void 0) { teleg = 'src/marech'; }
    var configs = {
        output: output,
        input: {
            path: input,
            files: '**/*.html',
        },
        telegs: {
            path: teleg,
            filesByTelegName: true,
        },
    };
    return configs;
};
var simpleConfig = function (confd) {
    var input = confd.input, output = confd.output, teleg = confd.teleg;
    return defaultConfigs(input, output, teleg);
};
var mergeConfigs = function (userConfigs) {
    var mergedConfigs = __assign({}, defaultConfigs, userConfigs);
    return mergedConfigs;
};
var resolveConfig = function (config, dir) {
    if (dir === void 0) { dir = './'; }
    var resolvedConfigs = JSON.parse(JSON.stringify(config));
    resolvedConfigs.telegs.path = path_1.default.join(path_1.default.resolve(dir), resolvedConfigs.telegs.path);
    resolvedConfigs.input.path = path_1.default.join(path_1.default.resolve(dir), (resolvedConfigs.input.path));
    resolvedConfigs.output = path_1.default.join(path_1.default.resolve(dir), resolvedConfigs.output);
    return resolvedConfigs;
};
exports.default = {
    defaultNames: defaultNames,
    defaultConfigs: defaultConfigs,
    simpleConfig: simpleConfig,
    mergeConfigs: mergeConfigs,
    resolveConfig: resolveConfig,
};
