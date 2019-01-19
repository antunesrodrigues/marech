const resolveFunction = require('../../lib/functions/function-js');

const marechCore = (telegHtml, args, defaultArgs = {}) => {
  const telegWithoutMarech = telegHtml;

  // Define final teleg
  let finalTeleg = telegWithoutMarech;

  // Verify if args are object
  if (Object.prototype.toString.call(args) === '[object Object]' && args.length) {
    const directives = finalTeleg.match(/{( *).+( *)}/g);

    for (let i = 0; i < directives.length; i += 1) {
      const directive = directives[i];
      const directiveName = directive.replace(/{|}/g, '');

      const argsDirective = args[directiveName];
      const defaultDirective = defaultArgs[directiveName];

      const replace = argsDirective || defaultDirective || '';

      finalTeleg = finalTeleg.replace(new RegExp(`${directive}`, 'g'), replace);
    }
  }

  const rjs = finalTeleg.match(/JS\(([^](?!(>)))*\)/g);
  if (rjs) {
    rjs.forEach((e) => {
      finalTeleg = finalTeleg.replace(e, resolveFunction(e));
    });
  }
  return finalTeleg;
};


module.exports = marechCore;
