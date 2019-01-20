"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var name_or_props_1 = __importDefault(require("./attr-and-props/name-or-props"));
var attr_to_obj_1 = __importDefault(require("./attr-and-props/attr-to-obj"));
var exec_obj_1 = __importDefault(require("./attr-and-props/exec-obj"));
var find_teleg_name_1 = __importDefault(require("./files/find-teleg-name"));
var before_and_after_match_1 = __importDefault(require("./general/before-and-after-match"));
var ux_marech_1 = __importDefault(require("./general/ux-marech"));
var itens = {
    nameOrProps: name_or_props_1.default,
    attrToObj: attr_to_obj_1.default,
    execObj: exec_obj_1.default,
    findTelegName: find_teleg_name_1.default,
    beforeAndAfterMatch: before_and_after_match_1.default,
    uxMarech: ux_marech_1.default,
};
exports.default = itens;
