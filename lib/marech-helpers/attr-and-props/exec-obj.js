const attrToObj = require('./attr-to-obj');
const regExp = require('../../regexp/all');
const resolveFunction = require('../../functions/function-js');

// Execute @... calls
const execObj = (text, propes, prepropes = {}) => {
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

  // Analyse all @... attr
  const marechExp = regExp.flags;
  let mtch; // By eslint, 'mtch' need be defined
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
  
  // 
  // IDENTATION
  // Set default tab
  let tabs = '\t'; 
  if (finalFlags.indent != '\t') {
    // Set the new "tab"
    tabs = ' '.repeat(finalFlags.indent);
  }
  // Indent
  finalTeleg = finalTeleg.replace(/(?:\n|^)/g, `\n${tabs}`);
  finalTeleg = tabs + finalTeleg;
  // END IDENTATION
  // 

  // Find marech definition
  const marechDefinition = finalTeleg.match(regExp.marechDef) ? finalTeleg.match(regExp.marechDef)[0] : '';
  // User's can define default attr if aren't defined
  const defaultTelegArgs = attrToObj(marechDefinition.slice(7, -1));

  
  // Remove @ flags
  const args = attrToObj(props.replace(regExp.flags, ''));
  // Resolve JS(...) inside marech tag
  // const rjs = finalTeleg.match(/JS\(([^](?!(>)))*\)/g);
  // if(rjs) {
  //   rjs.forEach(e => {
  //     finalTeleg = finalTeleg.replace(e, resolveFunction(e));
  //   });
  // }
  

  // Remove marech definition from final teleg
  finalTeleg = finalTeleg.replace(marechDefinition, '').trim();

  // Return data
  return {
    args,
    defaultTelegArgs,
    flags,
    marechTeleg: finalTeleg,
  };
};

module.exports = execObj;