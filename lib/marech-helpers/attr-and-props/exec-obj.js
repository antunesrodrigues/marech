const attrToObj = require('./attr-to-obj');

// Execute @... calls
const propFunctions = (text, propes, prepropes = {}) => {
  let finalTeleg = text;
  let props = propes;
  
  let flags = {};
  let finalFlags = {
    indent: (prepropes.indent ? prepropes.indent : 0),
  };


  // Line break?
  if (props[0] !== ' ') {
    props = ' ' + props;
  }

  // Analyse @ call's
  const marechExp = / @.+=("|').*\1/g;
  let mtch; // By eslint, 'match' need be defined
  while ((mtch = marechExp.exec(props)) !== null) {
    // Split each @foo=... @bar=... to ["foo='...'", "bar='...'"]
    let matches = mtch[0].split(/(\n|[ ])@/g);

    // Remove null itens
    matches = matches.filter(i => i.trim());
    // Convert '=' to ':'
    matches = matches.map(i => i.replace(/=(?='|")/, ':'));
  
    // Convert to JS Object
    flags = attrToObj(matches);
  
    if (flags.indent && finalFlags.indent !== '\t') {
      finalFlags.indent = flags.indent + finalFlags.indent;
    }
  }
  
  // Set default tab
  let tabs = '\t';
  // If indent are a number
  if (finalFlags.indent != '\t') {
    // Set the new "tab"
    tabs = ' '.repeat(finalFlags.indent);
  }
  
  // INDENT IT
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