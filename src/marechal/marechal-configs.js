const path = require('path');

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

const simpleConfig = (confd) => {
  const {input, output, teleg} = confd;
  return defaultConfigs(input, output, teleg);
};


const mergeConfigs = (userConfigs) => {
  const mergedConfigs = Object.assign({}, defaultConfigs, userConfigs);

  return mergedConfigs;
};

const resolveConfig = (config) => {
  let resolvedConfigs = JSON.parse(JSON.stringify(config));

  resolvedConfigs.telegs.path = path.resolve(resolvedConfigs.telegs.path);
  resolvedConfigs.input.path = path.resolve(resolvedConfigs.input.path);
  resolvedConfigs.output = path.resolve(resolvedConfigs.output);
  
  return resolvedConfigs;
};




module.exports = {
  defaultConfigs,
  simpleConfig,

  mergeConfigs,

  resolveConfig,
};