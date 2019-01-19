// Required libs
const fs = require('fs');
const path = require('path');
const sendError = require('../../final-user/error/send-error');


// Verify if file exists
const verifyFile = (file) => {
  const fileName = path.normalize(file);

  const exists = fs.existsSync(fileName);

  if (!exists) {
    return false;
  }
  return true;
};

// Read file
const readFile = (file) => {
  // Verify if file exists
  if (verifyFile(file)) {
    return fs.readFileSync(file, 'utf-8');
  }
  sendError(`File not found: ${file}`);

  return '';
};


// Require file
const requireFile = (file, message) => {
  if (!verifyFile(file)) {
    const errorMessage = message || `File not found: ${path.parse(file).base}`;
    sendError(errorMessage);
  }
  return readFile(file);
};


// Create file
const createFile = (file, data, isConfig = false) => {
  let content = data;

  // Verify if is object
  if (Object.prototype.toString.call(data) === '[object Object]') {
    content = JSON.stringify(data, '', '  ');
    if (isConfig) {
      content = `module.exports = ${content};`;
    }
  }
  content = content.toString();

  fs.writeFileSync(file, content);
};

// Export
module.exports = {
  verifyFile,
  readFile,
  requireFile,
  createFile,
};
