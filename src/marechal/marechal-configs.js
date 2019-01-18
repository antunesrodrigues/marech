// Required libs
const path = require('path');

// Default names
const defaultNames = {
  filename: 'marechal-config'
};

// Get default configs
const defaultConfigs = (input = 'src', output = 'dist', teleg = 'src/marech') => {
  const configs = {
    input: {
      path: input,
      files: '**/*.html'
    },
    output: output,
  
    telegs: {
      path: teleg,
      filesByTelegName: true,
    },
  };
  return configs;
};

// Get 'default' configs with path changed
const simpleConfig = (confd) => {
  const {input, output, teleg} = confd;
  return defaultConfigs(input, output, teleg);
};

// Merge default configs with user configs
const mergeConfigs = (userConfigs) => {
  const mergedConfigs = Object.assign({}, defaultConfigs, userConfigs);

  return mergedConfigs;
};

// Convert relative paths to real paths
const resolveConfig = (config, dir = './') => {
  let resolvedConfigs = JSON.parse(JSON.stringify(config));

  resolvedConfigs.telegs.path = path.join(path.resolve(dir), resolvedConfigs.telegs.path);
  resolvedConfigs.input.path = path.join(path.resolve(dir), (resolvedConfigs.input.path));
  resolvedConfigs.output = path.join(path.resolve(dir), resolvedConfigs.output);
  
  return resolvedConfigs;
};



// Export all
module.exports = {
  defaultNames,
  
  defaultConfigs,
  simpleConfig,

  mergeConfigs,

  resolveConfig,
};