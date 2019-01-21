"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var regExp = {
    marechTag: /<Marech@(([^](?!<))*)(\/>|><\/Marech>)/gi,
    marechTagAttr: /(?<=<Marech@).*(?=(\/>|><\/Marech>))/i,
    marechDef: /<Marech(([^](?!<))*)(\/>|><\/Marech>)/gi,
    marechDefOnlyArgs: /(?<=<Marech)[^]*(?=(\/>|><\/Marech>))/gi,
    attr: /(?:^|[ ])([a-z]+)=("|')/gi,
    flags: /(?:^|[ ]) @.+=("|').*\1/g,
};
exports.default = regExp;
