"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var uxMarech = function (text, preText) {
    var greatText = text;
    var whatsBad = ['+', '*', '(', ')'];
    whatsBad.forEach(function (e) {
        greatText = greatText.replace(new RegExp("\\" + e, 'g'), "\\" + e);
    });
    var tab = 0;
    var tabs = preText.match(new RegExp("\n( {0,}|\t)" + greatText));
    if (tabs) {
        if (tabs[1] === '\t') {
            tab = '\t';
        }
        else {
            tab = tabs[1].length;
        }
    }
    return {
        indent: tab,
    };
};
exports.default = uxMarech;
