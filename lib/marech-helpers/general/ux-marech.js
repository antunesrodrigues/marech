
// Function's for better design of final code...
const uxMarech = (text, preText) => {
  // Preprops

  // Use current identation
  const tabs = preText.match(new RegExp(`\n( {1,})${text}`));
  
  return {
    indent: tabs[1].length
  };
};

module.exports = uxMarech;