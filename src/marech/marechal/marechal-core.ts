/* eslint-disable no-console */
const marechalUtil = require('../../lib/all');

const marechalCore = (telegHtml, args, defaultArgs = {}) => {
  // Define final teleg
  let finalTeleg = telegHtml;

  // Go to each {...}
  const directives = finalTeleg.match(/{( *).+( *)}/g);
  for (let i = 0; i < directives.length; i += 1) {
    const directive = directives[i];
    const directiveName = directive.replace(/{|}/g, '');

    const argsDirective = args[directiveName];
    const defaultDirective = defaultArgs[directiveName];

    const replace = argsDirective || defaultDirective || '';

    finalTeleg = finalTeleg.replace(new RegExp(`${directive}`, 'g'), replace);
  }

  // Resolve JS outputs
  const rjs = finalTeleg.match(/JS\(([^](?!(>)))*\)/g);
  if (rjs) {
    rjs.forEach((e) => {
      finalTeleg = finalTeleg.replace(e, marechalUtil.functions.resolveFunction(e));
    });
  }

  // Remove marech tag definition
  finalTeleg = finalTeleg.replace(marechalUtil.regExp.marechDef, '').trimLeft();
  return finalTeleg;
};


module.exports = marechalCore;
