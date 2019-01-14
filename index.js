// Required libs
const path = require('path');
const glob = require('glob');

// MarechalLibs
const marechalUtil = require('./lib/util');
const marechalByDocText = require('./lib/marechal-by-doctext');

// MarechalFiles
const userConfigs = require('./test/marech-config.js');

const defaultConfigs = {
  input: {
    path: 'src',
    files: '**/*.html'
  },
  output: 'dist',

  telegs: {
    path: 'src/marech',
    filesByTelegName: true,
  },
};

const relativeConfigs = Object.assign({}, defaultConfigs, userConfigs);

const resolvedConfigs = JSON.parse(JSON.stringify(relativeConfigs));
resolvedConfigs.telegs.path = path.resolve(relativeConfigs.telegs.path);
resolvedConfigs.input.path = path.resolve(relativeConfigs.input.path);
resolvedConfigs.output = path.resolve(relativeConfigs.output);


// Get all files matched by input

glob(path.join(relativeConfigs.input.path, relativeConfigs.input.files), {ignore: path.join(relativeConfigs.telegs.path, '/**/*.html')}, (err, files) => {
  if(err) throw err;
  // Go to each input file
  files.forEach((file) => {
    // Read file content
    const originalData = marechalUtil.readFile(path.resolve(file));

    // Marech it
    const finalData = marechalByDocText(originalData, resolvedConfigs);

    // Get file name
    const fileName = file.replace(relativeConfigs.input.path, '');
    // Get full patch
    const finalFileName = path.join(resolvedConfigs.output, fileName);

    // Create folder if not exists
    marechalUtil.createPath(path.parse(finalFileName).dir);

    // Create final file
    marechalUtil.createFile(finalFileName, finalData);
  });
});
