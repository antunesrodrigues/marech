const path = require('path');
const glob = require('glob');

const marechalUtil = require('../../../lib/util');
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
        if(marechalUtil.existsPath(path.resolve(dir))) {
          workDir = dir;
        }
      } else {
        workDir = path.resolve(workDir);
      }

      const resolvedConfigFile = path.join(process.cwd(), configFile);
      
      // MarechalFiles
      const userConfigs = marechalUtil.requireFile(resolvedConfigFile);

      // Configs with relative path's
      const relativeConfigs = marechalConfigs.mergeConfigs(userConfigs);
      // Configs with real path location
      const resolvedConfigs = marechalConfigs.resolveConfig(relativeConfigs, workDir);

      // Get all files matched by input
      glob(path.join(workDir, relativeConfigs.input.path, relativeConfigs.input.files), {ignore: path.join(workDir, relativeConfigs.telegs.path, '/**/*.html')}, (err, files) => {
        if(err) throw err;
        
        // Go to each input file 
        files.forEach((file) => {
          // console.log(resolvedConfigs);
          marechalByFile.byFileAndCreate(workDir, file, relativeConfigs, resolvedConfigs);
          
          const onlyFileName = path.relative(relativeConfigs.input.path, file);
          console.info(`${onlyFileName} - OK!`);
        });
        console.info(`\nOutput: ${relativeConfigs.output}`);
      });
    });
};

module.exports = compile;