const fs = require('fs');
const path = require('path');
// 
// VERIFY
// Verify if location exists, if not, create it
const verifyPath = (location) => {
  const finalPath = path.normalize(location);
  const exists = fs.existsSync(finalPath);
  
  return exists;
};
const createPath = (location) => {
  if(!verifyPath(location)) {
    fs.mkdirSync(location);
  }
  return true;
};

module.exports = {
  verifyPath,
  createPath
};
