"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var before_and_after_match_1 = __importDefault(require("../general/before-and-after-match"));
var resolve_function_1 = __importDefault(require("../../functions/resolve-function"));
var reg_exp_1 = __importDefault(require("../../padroes/reg-exp"));
var attrToObj = function (attributes) {
    var props = {};
    if (attributes.length) {
        var propsStr_1 = attributes;
        var firstProp = true;
        var mtch2 = void 0;
        while ((mtch2 = reg_exp_1.default.attr.exec(propsStr_1)) != null) {
            var beforeProp = before_and_after_match_1.default.before(mtch2.input, mtch2);
            propsStr_1 = beforeProp;
            if (!firstProp) {
                propsStr_1 += ', ';
            }
            else {
                firstProp = false;
            }
            var replaced = "\"" + mtch2[1] + "\":" + mtch2[2];
            propsStr_1 += replaced;
            var afterProp = before_and_after_match_1.default.after(mtch2.input, mtch2);
            propsStr_1 += afterProp;
        }
        var withSingle = propsStr_1.match(/:'(.*)'[,]/g);
        if (withSingle) {
            withSingle.forEach(function (i) {
                var find = i.match(/:'(.*)'[,|^]/);
                if (find) {
                    var content = find[1].replace(/"/g, '\\"');
                    var withDouble = ":\"" + content + "\",";
                    propsStr_1 = propsStr_1.replace(new RegExp(i, 'g'), withDouble);
                }
            });
        }
        props = JSON.parse("{" + propsStr_1 + "}");
        for (var i in props) {
            if (props[i].slice(0, 3) === 'JS(' && props[i].slice(-1) === ')') {
                props[i] = resolve_function_1.default(props[i]);
            }
        }
    }
    return props;
};
exports.default = attrToObj;
