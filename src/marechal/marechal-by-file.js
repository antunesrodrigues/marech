const path = require('path');

const marechalUtil = require('../../lib/util');
const marechalByText = require('./marechal-by-text');


const byFile = (file, relativeConfigs, resolvedConfigs) => {
  // Read file content
  const originalData = marechalUtil.readFile(path.resolve(file));
    
  // Marech it
  const finalData = marechalByText(originalData, resolvedConfigs);
  
  return finalData;
};

const byFileAndCreate = (file, relativeConfigs, resolvedConfigs) => {
  const finalData = byFile(file, relativeConfigs, relativeConfigs);

  // Get file name
  const fileName = file.replace(relativeConfigs.input.path, '');
  // Get full patch
  const finalFileName = path.join(resolvedConfigs.output, fileName);

  // Create folder if not exists
  marechalUtil.createPath(path.parse(finalFileName).dir);

  // Create final file
  marechalUtil.createFile(finalFileName, finalData);
};

module.exports = {
  byFile,
  byFileAndCreate,
};