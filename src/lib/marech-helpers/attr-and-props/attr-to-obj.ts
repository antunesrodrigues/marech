import beforeAndAfterMatch from '../general/before-and-after-match';
import resolveFunction from '../../functions/resolve-function';
import regExp from '../../padroes/reg-exp';

// Convert HTML attributes to JS Object
const attrToObj:Function = (attributes:string) => {
  // Set default object if 'attributes' are empty
  let props:{ [propName: string]: string; } = {};

  // Verify if attributes are ok
  if (attributes.length) {
    // Create a sandbox copy
    let propsStr = attributes;

    let firstProp = true; // Verify if is first time at the loop
    let mtch2;
    while ((mtch2 = regExp.attr.exec(propsStr)) != null) {
      // Get text before attr definition
      const beforeProp = beforeAndAfterMatch.before(mtch2.input, mtch2);
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
      const afterProp = beforeAndAfterMatch.after(mtch2.input, mtch2);
      // Add change to propsStr
      propsStr += afterProp;
    }

    // Convert foo:'bar' to foo:"bar"
    const withSingle = propsStr.match(/:'(.*)'[,]/g);
    if (withSingle) {
      withSingle.forEach((i) => {
        const find = i.match(/:'(.*)'[,|^]/);
        if (find) {
          const content = find[1].replace(/"/g, '\\"');
          const withDouble = `:"${content}",`;

          propsStr = propsStr.replace(new RegExp(i, 'g'), withDouble);
        }
      });
    }

    // Convert to JS Object
    props = JSON.parse(`{${propsStr}}`);

    for (const i in props) {
      // Verify if user want use JS functions
      if (props[i].slice(0, 3) === 'JS(' && props[i].slice(-1) === ')') {
        props[i] = resolveFunction(props[i]);
      }
    }

  }

  return props;
};

export default attrToObj;
