/* eslint-disable no-cond-assign */
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
      const replaced = `"${mtch2[1]}":${mtch2[2]}`;

      // Add change to propsStr
      propsStr += replaced;

      // Get text after propertie definition
      const afterProp = matchFunctions.after(mtch2.input, mtch2);
      // Add change to propsStr
      propsStr += afterProp;
    }

    // Convert foo:'bar' to foo:"bar"
    const withSingle = propsStr.match(/:'(.*)'[,|^]/g);
    if (withSingle) {
      withSingle.forEach((i) => {
        const content = i.match(/:'(.*)'[,|^]/)[1].replace(/"/g, '\\"');
        const withDouble = `:"${content}",`;

        propsStr = propsStr.replace(new RegExp(i, 'g'), withDouble);
      });
    }


    // Convert to JS Object
    props = JSON.parse(`{${propsStr}}`);

    // Verify if user want use JS functions
    const propsValues = Object.values(props);
    for (let i = 0; i < propsValues.length; i += 1) {
      if (propsValues[i].slice(0, 3) === 'JS(' && propsValues[i].slice(-1) === ')') {
        props[i] = resolveFunction(propsValues[i]);
      }
    }
  }

  return props;
};

module.exports = attrToObj;
