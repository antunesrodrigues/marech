// 
// OTHERS
// Convert HTML attributes to JS Object
const attrToObj = (attributes) => {
  // Set default object if 'attributes' are empty
  let props = {};

  // Verify if attributes are ok
  if(attributes.length) {
    let propsStr = attributes;
    
    // Split each attr
    const propsReg = (/(?:^|[ ])([a-z]+)=("|')/gi);
    
    // By eslint, 'match2' need be defined
    let match2;
    // Verify if is first time at the loop
    let firstProp = true;
    while((match2 = propsReg.exec(propsStr)) != null) {
      // Get text before attr definition
      const beforeProp = match2.input.slice(0, match2.index);
      propsStr = beforeProp;
      
      // Add ', ' if aren't first attr
      if(!firstProp) {
        propsStr += ', ';
      } else {
        firstProp = false;
      }
      
      // Replace '=' to ':'
      const replaced = match2[0].replace('=', ':');

      // Add change to propsStr
      propsStr += replaced;
      
      // Get text after propertie definition
      const afterProp =  match2.input.slice(match2.index + match2[0].length);
      propsStr += afterProp;
    }

    // Convert to JS Object
    props = Function(`'use strict'; return({${propsStr}})`)();
  }

  return props;
};


// Return before and after from text by match
const match = {
  before(text, match) {
    return text.slice(0, match.index);
  },

  after(text, match) {
    return text.slice(match.index + match[0].length);
  }
};

const nameOrProps = (mode, text) => {
  // Name (+ properties)
  const nameAndProps = text.match(/(?:<Marech@)(.*)(?=>)/i)[1];

  // Name
  const name = nameAndProps.split(' ')[0];

  // Props
  const props = nameAndProps.slice(name.length + 1).trim();

  if(mode == 'name') {
    return name;
  } else if(mode == 'props') {
    return props;
  } else {
    return '';
  }
};

module.exports = {
  attrToObj,
  match,
  nameOrProps
};