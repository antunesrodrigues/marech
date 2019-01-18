const attrToObj = require('./attr-to-obj');

// Execute @... calls
const propFunctions = (text, propes, prepropes = {}) => {
  let finalTeleg = text;
  let props = propes;
  let flags = {};

  let finalFlags = {
    indent: (prepropes.indent ? prepropes.indent : 0),
  };

  // Break line?
  if (props[0] !== ' ') {
    props = ' ' + props;
  }

  // Analyse @ call's
  const marechExp = / @.+=("|').*\1/g;
  
  let mtch; // By eslint, 'match' need be defined
  while ((mtch = marechExp.exec(props)) !== null) {
  
    let matches = mtch[0].split(/(\n|[ ])@/g);
    matches = matches.filter(i => i.trim());
    matches = matches.map(i => i.replace(/=(?='|")/, ':'));
  
  
    flags = attrToObj(matches);
  
    if (flags.indent && finalFlags.indent !== '\t') {
      finalFlags.indent = flags.indent + finalFlags.indent;
    }
  }
  
  let tabs = '\t';
  if (finalFlags.indent != '\t') {
    tabs = ' '.repeat(finalFlags.indent);
  }
  
  finalTeleg = finalTeleg.replace(/(?:\n|^)/g, `\n${tabs}`);
  finalTeleg = tabs + finalTeleg;
  
  const args = attrToObj(props.replace(/@.+=("|').*\1/g, ''));
  return {
    args,
    flags,
    marechTeleg: finalTeleg,
  };
};

module.exports = propFunctions;