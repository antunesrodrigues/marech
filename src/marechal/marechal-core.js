const resolveFunction = require('../../lib/functions/function-js');

const marechCore = (telegHtml, args, defaultArgs = {}) => {
  const telegWithoutMarech = telegHtml;
  
  // Define final teleg
  let finalTeleg = telegWithoutMarech;

  // Verify if args are object
  if(Object.prototype.toString.call(args) === '[object Object]') {
    const directives = finalTeleg.match(/{( *).+( *)}/g);
    for (let i in directives) {
      const directive = directives[i];
      const directiveName = directive.replace(/{|}/g, '');
      
      const replace = (args[directiveName] ? args[directiveName] : (defaultArgs[directiveName] ? defaultArgs[directiveName] : ''));
      
      finalTeleg = finalTeleg.replace(new RegExp(`${directive}`, 'g'), replace);
    }
  }
  
  const rjs = finalTeleg.match(/JS\(([^](?!(>)))*\)/g);
  if(rjs) {
    rjs.forEach(e => {
      finalTeleg = finalTeleg.replace(e, resolveFunction(e));
    });
  }
  return finalTeleg;
};


module.exports = marechCore;