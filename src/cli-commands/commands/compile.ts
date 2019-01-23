// Required libs
import path from 'path';
import fs from 'fs';
import glob from 'glob';
import { Command } from 'commander';

import marechalByFile from 'marech-core/dist/marechal/marechal-by-file';
import marechalConfigs from 'marech-core/dist/marechal/marechal-configs';

const compile = (commander:Command) => {
  commander
    .command('compile [dir]')
    .alias('c')
    .description('Compile marech')
    .option('-c, --config [filename]', 'Set custom marech-config file')
    .action((dir:(string|null), opt:{config: (string | boolean)}) => {
      let configFile = './marech-config.json';
      let workDir = './';

      if (opt.config && typeof opt.config !== 'boolean') {
        configFile = opt.config;
      }

      if (dir) {
        if (fs.existsSync(path.resolve(dir))) {
          workDir = dir;
        }
      } else {
        workDir = path.resolve(workDir);
      }

      // Convert relative path to real path. Like marechal-config -> C:\path\to\marechal-config.js
      const resolvedConfigFile = path.join(process.cwd(), configFile);
      // Import user configs
      const userConfigs = JSON.parse(fs.readFileSync(resolvedConfigFile, 'utf-8'));

      // Configs with relative path's
      const relativeConfigs = marechalConfigs.mergeConfigs(userConfigs);
      // Configs with real path location
      const resolvedConfigs = marechalConfigs.resolveConfig(relativeConfigs, workDir);

      const filesLocation = path.join(workDir, relativeConfigs.input.path);
      const fullFilesLocation =  path.join(filesLocation, relativeConfigs.input.files);

      const componetsFiles = path.join(workDir, relativeConfigs.components.path, '/**/*.html');
      const ignoreFiles = { ignore: componetsFiles };

      // Get all files matched by input
      glob(fullFilesLocation, ignoreFiles, (err:any, files:string[]) => {
        if (err) throw err;

        // Go to each input file
        files.forEach((file:string) => {
          // Use marechal to file
          marechalByFile.byFileAndCreate(workDir, file, relativeConfigs, resolvedConfigs);

          // Get relative filename from current dir
          const onlyFileName = path.relative(relativeConfigs.input.path, file);
          console.info(`${onlyFileName} - OK!`);
        });
        // Send output dir
        console.info(`\nOutput: ${relativeConfigs.output.path}`);
      });
    });
};

export default compile;
