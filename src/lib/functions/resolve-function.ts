const resolveFunction:Function = (fnTxt:string) => {
  let fn = fnTxt;
  if (fn.slice(0, 3) !== 'JS(') {
    fn = `JS(${fn}`;
  }
  if (fn.slice(-1) !== ')') {
    fn = `${fn})`;
  }

  const execFunct = Function(`
  'use strict';
  const JS = (...args) => Object.values(args).join('');

  return(${fn})
  `);

  return execFunct();
};

export default resolveFunction;
