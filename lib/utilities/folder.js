const fs = require('fs');
const path = require('path');

const sendError = require('./send-error');
// 
// VERIFY
// Verify if location exists, if not, create it
const verifyPath = (location) => {
  const finalPath = path.normalize(location);
  const exists = fs.existsSync(finalPath);
  
  return exists;
};
const existsPath = (location, message = 'Path don\'t found') => {
  if(!verifyPath(location)) {
    sendError(message);
  }
  return true;
};

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
