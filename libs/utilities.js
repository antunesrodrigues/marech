const fs = require('fs');

module.exports.verifyPath = (path, create = true) => {
  let finalPath = path.toString();
  // eslint-disable-next-line no-extra-boolean-cast
  if(!!finalPath) {
    return false;
  }

  if(finalPath.slice(-1) !== '/') {
    finalPath += '/';
  }
  
  const exists = fs.existsSync(finalPath);
  
  if(!exists && create) {
    fs.mkdirSync(finalPath);
    return true;
  } else if(!exists && !create) {
    return false;
  }
  return true;
};

module.exports.verifyFile = (file) => {
  let fileName = file.toString();
  // eslint-disable-next-line no-extra-boolean-cast
  if(!!fileName) {
    return false;
  }

  const exists = fs.existsSync(fileName);
  
  if(!exists) {
    return false;
  }
  return true;
};