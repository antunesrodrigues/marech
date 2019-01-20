// Required libs
import path from 'path';
import { ConfigsInterface } from './../../lib/marech-helpers/interfaces/configs-interface';

// Default names
const defaultNames = {
  filename: 'marechal-config',
};

// Get default configs
const defaultConfigs = (input = 'src', output = 'dist', teleg = 'src/marech'):ConfigsInterface => {
  const configs = {
    output,

    input: {
      path: input,
      files: '**/*.html',
    },

    telegs: {
      path: teleg,
      filesByTelegName: true,
    },
  };
  return configs;
};

// Get 'default' configs with path changed
const simpleConfig = (confd:any) => {
  const { input, output, teleg } = confd;
  return defaultConfigs(input, output, teleg);
};

// Merge default configs with user configs
const mergeConfigs = (userConfigs:ConfigsInterface) => {
  const mergedConfigs = { ...defaultConfigs, ...userConfigs };

  return mergedConfigs;
};

// Convert relative paths to real paths
const resolveConfig = (config:object, dir = './'):ConfigsInterface => {
  const resolvedConfigs = JSON.parse(JSON.stringify(config));

  resolvedConfigs.telegs.path = path.join(path.resolve(dir), resolvedConfigs.telegs.path);
  resolvedConfigs.input.path = path.join(path.resolve(dir), (resolvedConfigs.input.path));
  resolvedConfigs.output = path.join(path.resolve(dir), resolvedConfigs.output);

  return resolvedConfigs;
};

// Export all
export default {
  defaultNames,

  defaultConfigs,
  simpleConfig,

  mergeConfigs,

  resolveConfig,
};
