"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var findTelegFile = function (telegName, configs) {
    var file = '';
    if (configs.telegs.filesByTelegName) {
        file = telegName + ".html";
    }
    if (configs.telegs.files) {
        configs.telegs.files.forEach(function (fl) {
            if (fl.id === telegName) {
                (file = fl.file);
            }
        });
    }
    return file;
};
exports.default = findTelegFile;
