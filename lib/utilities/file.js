const fs = require('fs');
const path = require('path');
// 
// VERIFY
// Verify if file exists
const verifyFile = (file) => {
  const fileName = path.normalize(file);

  const exists = fs.existsSync(fileName);
  
  if(!exists) {
    return false;
  }
  return true;
};

// 
// READ
// Read file 
const readFile = (file) => {
  // Verify if file exists
  if(verifyFile(file)) {
    return fs.readFileSync(file, 'utf-8');
  }
  return '';
};

// 
// CREATE
// Create file
const createFile = (file, data, isConfig = false) => {
  let content = data;
  // Verify if is object
  if(Object.prototype.toString.call(data) == '[object Object]') {
    content = JSON.stringify(data, '', '  ');
    if(isConfig) {
      content = `module.exports = ${content};`;
    }
  }
  content = content.toString();

  fs.writeFileSync(file, content);
};


module.exports = {
  verifyFile,
  readFile,
  createFile,
};
