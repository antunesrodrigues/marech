"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var regExp = {
    marechTag: /<Marech@(([^](?!<))*)>/gi,
    marechTagAttr: /(?:<Marech@)(.*)(?=>)/i,
    marechDef: /<Marech(([^](?!<))*)>/gi,
    attr: /(?:^|[ ])([a-z]+)=("|')/gi,
    flags: /(?:^|[ ]) @.+=("|').*\1/g,
};
exports.default = regExp;
