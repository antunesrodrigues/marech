
// Function's for better design of final code...
const uxMarech:Function = (text:string, preText:string) => {
  let greatText = text;
  const whatsBad = ['+', '*', '(', ')'];

  whatsBad.forEach((e) => {
    greatText = greatText.replace(new RegExp(`\\${e}`, 'g'), `\\${e}`);
  });

  let tab:(string|number) = 0;

  // Use current identation
  const tabs = preText.match(new RegExp(`\n( {0,}|\t)${greatText}`));

  if (tabs) {
    if (tabs[1] === '\t') {
      tab = '\t';
    } else {
      tab = tabs[1].length;
    }
  }

  return {
    indent: tab,
  };
};

export default uxMarech;
