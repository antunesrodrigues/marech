// Required libs
const path = require('path');
const glob = require('glob');
const util = require('../../../lib/all');
const marechalConfigs = require('../../marechal/marechal-configs');
const marechalByFile = require('../../marechal/marechal-by-file');


const compile = (program) => {
  program
    .command('compile [dir]')
    .alias('c')
    .description('Compile marech')
    .option('-c, --config [filename]', 'Set custom marech-config file')
    .action((dir, opt) => {
      let configFile = './marech-config.js';
      let workDir = './';

      if(opt.config && opt.config !== true) {
        configFile = opt.config;
      }
      
      if(dir) {
        if(util.disk.folder.existsPath(path.resolve(dir))) {
          workDir = dir;
        }
      } else {
        workDir = path.resolve(workDir);
      }

      // Convert relative path to real path. Like marechal-config -> C:\path\to\marechal-config.js
      const resolvedConfigFile = path.join(process.cwd(), configFile);
      // Import user configs
      const userConfigs = util.disk.file.requireFile(resolvedConfigFile);

      // Configs with relative path's
      const relativeConfigs = marechalConfigs.mergeConfigs(userConfigs);
      // Configs with real path location
      const resolvedConfigs = marechalConfigs.resolveConfig(relativeConfigs, workDir);

      // Get all files matched by input
      glob(path.join(workDir, relativeConfigs.input.path, relativeConfigs.input.files), {ignore: path.join(workDir, relativeConfigs.telegs.path, '/**/*.html')}, (err, files) => {
        if(err) throw err;
        
        // Go to each input file 
        files.forEach((file) => {
          // Use marechal to file
          marechalByFile.byFileAndCreate(workDir, file, relativeConfigs, resolvedConfigs);
          
          // Get relative filename from current dir
          const onlyFileName = path.relative(relativeConfigs.input.path, file);
          console.info(`${onlyFileName} - OK!`);
        });
        // Send output dir
        console.info(`\nOutput: ${relativeConfigs.output}`);
      });
    });
};

module.exports = compile;