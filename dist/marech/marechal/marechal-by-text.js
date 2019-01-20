"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var lib_1 = __importDefault(require("../../lib"));
var marechal_core_1 = __importDefault(require("./marechal-core"));
var marechalByData = function (originalData, configs) {
    var finalData = originalData;
    var marechExp = lib_1.default.padroes.regExp.marechTag;
    while (finalData.match(marechExp)) {
        var match = void 0;
        while ((match = marechExp.exec(finalData))) {
            match[0] = match[0].replace(/(\r|\t|\n| {2,})/g, ' ');
            var beforeTag = lib_1.default.marechHelpers.beforeAndAfterMatch.before(finalData, match);
            var beforeAndTag = beforeTag + match[0];
            var afterTag = lib_1.default.marechHelpers.beforeAndAfterMatch.after(finalData, match);
            var name_1 = lib_1.default.marechHelpers.nameOrProps('name', match[0]);
            var props = lib_1.default.marechHelpers.nameOrProps('props', match[0]);
            var preProps = lib_1.default.marechHelpers.uxMarech(match[0], beforeAndTag);
            var telegFile = lib_1.default.marechHelpers.findTelegName(name_1, configs);
            var telegPath = path_1.default.join(configs.telegs.path, telegFile);
            var originalMarechTeleg = lib_1.default.disk.file.readFile(telegPath);
            var splitedItens = lib_1.default.marechHelpers.execObj(originalMarechTeleg, props, preProps);
            var marechTeleg = splitedItens.marechTeleg, args = splitedItens.args, defaultTelegArgs = splitedItens.defaultTelegArgs;
            var mareched = marechal_core_1.default(marechTeleg, args, defaultTelegArgs);
            finalData = beforeTag + mareched + afterTag;
        }
    }
    finalData = finalData.replace(/\n {3,}\n/g, '\n');
    return finalData;
};
exports.default = marechalByData;
