const matchFunctions = require('../general/before-and-after-match');
const resolveFunction = require('../../functions/function-js');
const regExp = require('../../regexp/all');

// Convert HTML attributes to JS Object
const attrToObj = (attributes) => {
  // Set default object if 'attributes' are empty
  let props = {};

  // Verify if attributes are ok
  if (attributes.length) {
    // Create a sandbox copy
    let propsStr = attributes;
    
    let firstProp = true; // Verify if is first time at the loop
    let mtch2; // By eslint, 'mtch2' need be defined
    while ((mtch2 = regExp.attr.exec(propsStr)) != null) {
      // Get text before attr definition
      const beforeProp = matchFunctions.before(mtch2.input, mtch2);
      // Set to final var
      propsStr = beforeProp;
      
      // Add ', ' if aren't first attr
      if (!firstProp) {
        propsStr += ', ';
      } else {
        firstProp = false;
      }

      // Replace '=' to ':'
      const replaced = mtch2[0].replace('=', ':');
      // Add change to propsStr
      propsStr += replaced;
      
      // Get text after propertie definition
      const afterProp = matchFunctions.after(mtch2.input, mtch2);
      // Add change to propsStr
      propsStr += afterProp;
    }
    
    // Convert to JS Object
    props = Function(`'use strict'; return({${propsStr}})`)();

    // Verify if user want use JS functions
    for (const i in props) {      
      if(props[i].slice(0, 3) == 'JS(' && props[i].slice(-1) == ')') {
        props[i] = resolveFunction(props[i]);
      }
    }    
  }

  return props;
};

module.exports = attrToObj;