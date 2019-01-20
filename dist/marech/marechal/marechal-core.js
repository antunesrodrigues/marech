"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var lib_1 = __importDefault(require("../../lib"));
var marechalCore = function (telegHtml, args, defaultArgs) {
    if (defaultArgs === void 0) { defaultArgs = {}; }
    var finalTeleg = telegHtml;
    var directives = finalTeleg.match(/{( *).+( *)}/g);
    if (directives) {
        for (var i = 0; i < directives.length; i += 1) {
            var directive = directives[i];
            var directiveName = directive.replace(/{|}/g, '');
            var argsDirective = args[directiveName];
            var defaultDirective = defaultArgs[directiveName];
            var replace = argsDirective || defaultDirective || '';
            finalTeleg = finalTeleg.replace(new RegExp("" + directive, 'g'), replace);
        }
    }
    var rjs = finalTeleg.match(/JS\(([^](?!(>)))*\)/g);
    if (rjs) {
        rjs.forEach(function (e) {
            finalTeleg = finalTeleg.replace(e, lib_1.default.functions.resolveFunction(e));
        });
    }
    finalTeleg = finalTeleg.replace(lib_1.default.padroes.regExp.marechDef, '').trimLeft();
    return finalTeleg;
};
exports.default = marechalCore;
