const resolveFunction = (fn) => {
  if(fn.slice(0, 3) !== 'JS(') {
    fn = `JS(${fn}`;
  }
  if(fn.slice(-1) !== ')') {
    fn = `${fn})`;
  }
  
  const funct = Function(`
    'use strict';

    function JS(){
      return Object.values(arguments).join('')
    }; 

    return(${fn})
  `);

  return funct();
};

module.exports = resolveFunction;