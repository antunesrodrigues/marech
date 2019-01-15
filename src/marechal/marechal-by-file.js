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

const byFileAndCreate = (workDir, file, relativeConfigs, resolvedConfigs) => {
  const finalData = byFile(file, relativeConfigs, relativeConfigs);

  // Get file name
  const fileName = path.join(file).replace(path.join(workDir, relativeConfigs.input.path), '');
  // Get full patch
  const finalFileName = path.join(resolvedConfigs.output, path.normalize(fileName));

  // Create folder if not exists
  marechalUtil.createPath(path.parse(finalFileName).dir);

  // Create final file
  marechalUtil.createFile(finalFileName, finalData);
};

module.exports = {
  byFile,
  byFileAndCreate,
};