// Required libs
const fs = require('fs');
const path = require('path');
const sendError = require('./send-error');


// Verify path, if not exists, create.
const verifyPath = (location) => {
  const finalPath = path.normalize(location);
  const exists = fs.existsSync(finalPath);
  
  return exists;
};

// Verify if exists path
const existsPath = (location, message = 'Path don\'t found') => {
  if(!verifyPath(location)) {
    sendError(message);
  }
  return true;
};

// Create folder
const createPath = (location) => {
  if(!verifyPath(location)) {
    fs.mkdirSync(location);
  }
  return true;
};

module.exports = {
  verifyPath,
  existsPath,
  createPath,
};
