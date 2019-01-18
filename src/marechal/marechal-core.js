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
  
  return finalTeleg;
};


module.exports = marechCore;