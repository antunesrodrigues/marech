const resolveFunction = (fnTxt) => {
  let fn = fnTxt;
  if (fn.slice(0, 3) !== 'JS(') {
    fn = `JS(${fn}`;
  }
  if (fn.slice(-1) !== ')') {
    fn = `${fn})`;
  }

  // eslint-disable-next-line no-new-func
  const execFunct = Function(`
  'use strict';
  const JS = (...args) => Object.values(args).join('');

  return(${fn})
  `);

  return execFunct();
};

module.exports = resolveFunction;
