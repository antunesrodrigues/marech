const matchFunctions = require('./exec-obj');

// Convert HTML attributes to JS Object
const attrToObj = (attributes) => {
  // Set default object if 'attributes' are empty
  let props = {};

  // Verify if attributes are ok
  if (attributes.length) {
    // Create a sandbox copy
    let propsStr = attributes;

    // Split each attr
    const propsReg = (/(?:^|[ ])([a-z]+)=("|')/gi);
    
    // Verify if is first time at the loop
    let firstProp = true;
    let mtch2; // By eslint, 'mtch2' need be defined
    while ((mtch2 = propsReg.exec(propsStr)) != null) {
      // Get text before attr definition
      const beforeProp = matchFunctions.before(mtch2.input, mtch2);
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
  }

  return props;
};

module.exports = attrToObj;