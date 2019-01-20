// Required libs
import path from 'path';

import lib from '../../lib';
import marechalByText from './marechal-by-text';
import { ConfigsInterface as CI } from './../../lib/marech-helpers/interfaces/configs-interface';

// Marech by file
const byFile = (file:string, relativeConfigs:CI, resolvedConfigs:CI) => {
  // Read file content
  const originalData = lib.disk.file.readFile(path.resolve(file));
  // Marech it
  const finalData = marechalByText(originalData, resolvedConfigs);

  return finalData;
};

const byFileAndCreate = (workDir:string, file:string, relativeConfigs:CI, resolvedConfigs:CI) => {
  const finalData = byFile(file, relativeConfigs, relativeConfigs);

  // Get file name
  const fileName = path.join(file).replace(path.join(workDir, relativeConfigs.input.path), '');
  // Get full patch
  const finalFileName = path.join(resolvedConfigs.output, path.normalize(fileName));

  // Create folder if not exists
  lib.disk.folder.createPath(path.parse(finalFileName).dir);

  // Create final file
  lib.disk.file.createFile(finalFileName, finalData);
};

export default {
  byFile,
  byFileAndCreate,
};
