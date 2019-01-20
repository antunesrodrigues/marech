"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var resolveFunction = function (fnTxt) {
    var fn = fnTxt;
    if (fn.slice(0, 3) !== 'JS(') {
        fn = "JS(" + fn;
    }
    if (fn.slice(-1) !== ')') {
        fn = fn + ")";
    }
    var execFunct = Function("\n  'use strict';\n  const JS = (...args) => Object.values(args).join('');\n\n  return(" + fn + ")\n  ");
    return execFunct();
};
exports.default = resolveFunction;
