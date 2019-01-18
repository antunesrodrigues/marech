
// Function's for better design of final code...
const uxMarech = (text, preText) => {
  let greatText = text;
  const whatsBad = ['+', '*', '(', ')'];
  
  whatsBad.forEach(e => {
    greatText = greatText.replace(new RegExp(`\\${e}`, 'g'), `\\${e}`);
  });
  
  // Use current identation
  const tabs = preText.match(new RegExp(`\n( {0,}|\t)${greatText}`));
  const tab = tabs ? (tabs[1] == '\t' ? '\t' : tabs[1].length) : 0;
  
  return {
    indent: tab
  };
};

module.exports = uxMarech;