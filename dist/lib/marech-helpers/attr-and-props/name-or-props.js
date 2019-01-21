"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var reg_exp_1 = __importDefault(require("../../padroes/reg-exp"));
var nameOrProps = function (mode, text) {
    var tag = text.match(reg_exp_1.default.marechTagAttr);
    var nameAndProps = tag ? tag[0] : '';
    var name = nameAndProps.split(' ')[0];
    var props = nameAndProps.slice(name.length + 1).trim();
    if (mode === 'name') {
        return name;
    }
    if (mode === 'props') {
        return props;
    }
    return '';
};
exports.default = nameOrProps;
