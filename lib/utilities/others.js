// Return before and after from text by match
const matchFunctions = {
  before(text, match) {
    return text.slice(0, match.index);
  },

  after(text, match) {
    return text.slice(match.index + match[0].length);
  }
};

// Convert HTML attributes to JS Object
const attrToObj = (attributes) => {
  // Set default object if 'attributes' are empty
  let props = {};

  // Verify if attributes are ok
  if(attributes.length) {
    let propsStr = attributes;
    
    // Split each attr
    const propsReg = (/(?:^|[ ])([a-z]+)=("|')/gi);
    
    // By eslint, 'mtch2' need be defined
    let mtch2;
    // Verify if is first time at the loop
    let firstProp = true;
    while((mtch2 = propsReg.exec(propsStr)) != null) {
      // Get text before attr definition
      const beforeProp = matchFunctions.before(mtch2.input, mtch2);
      propsStr = beforeProp;
      
      // Add ', ' if aren't first attr
      if(!firstProp) {
        propsStr += ', ';
      } else {
        firstProp = false;
      }
      
      // Replace '=' to ':'
      const replaced = mtch2[0].replace('=', ':');

      // Add change to propsStr
      propsStr += replaced;
      
      // Get text after propertie definition
      const afterProp =  matchFunctions.after(mtch2.input, mtch2);
      
      propsStr += afterProp;
    }

    // Convert to JS Object
    props = Function(`'use strict'; return({${propsStr}})`)();
  }

  return props;
};


const nameOrProps = (mode, text) => {
  // Name (+ properties)
  const nameAndProps = text.match(/(?:<Marech@)(.*)(?=>)/i)[1];

  // Name
  const name = nameAndProps.split(' ')[0];

  // Props
  const props = nameAndProps.slice(name.length + 1).trim();//.replace(/@.+=("|').*\1/g, '');
  if(mode == 'name') {
    return name;
  } else if(mode == 'props') {
    return props;
  } else {
    return '';
  }
};


const propFunctions = (text, propes) => {
  let finalTeleg = text;
  let props = propes;
  let flags = {};
  
  // Analyse @ call's
  // const marechExp = /(?<=<Marech@.+) @.+=("|').*\1/g;
  const marechExp = / @.+=("|').*\1/g;
  
  if(props[0] !== ' ') {
    props = ' ' + props;
  }

  // By eslint, 'match' need be defined
  let mtch;
  while((mtch = marechExp.exec(props)) !== null) {
    // const after = finalTeleg.slice(0, match.index);
    // const before = finalTeleg.slice(match.index + match[0].length);
    
    // finalTeleg = after + before;

    let matches = mtch[0].split(/(\n|[ ])@/g);
    matches = matches.filter(i => i.trim());
    matches = matches.map(i => i.replace(/=(?='|")/, ':'));
    
    flags = attrToObj(matches);
    if(flags.indent) {
      const tabs = ' '.repeat(flags.indent);
      finalTeleg = finalTeleg.replace(/(?:\n|^)/g, `\n${tabs}`);
      finalTeleg = tabs + finalTeleg;
    }
  }
  const args = attrToObj(props.replace(/@.+=("|').*\1/g, ''));
  return {
    args,
    flags,
    marechTeleg: finalTeleg,
  };
};

module.exports = {
  attrToObj,
  matchFunctions,

  nameOrProps,
  propFunctions,
};