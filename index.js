#!/usr/bin/env node

// Required libs
const path = require('path');
const glob = require('glob');
const program = require('commander');
const inquirer = require('inquirer');


// Marechal libs
const marechalConfigs = require('./src/marechal/marechal-configs');
const marechalByFile = require('./src/marechal/marechal-by-file');
const utilFile = require('./lib/utilities/file');

program
  .version('0.1.0');

program
  .command('init [dir]')
  .description('Initialize March on current directory')
  // .option('-y, --yes', 'Yes')
  .action(() => {
    inquirer
      .prompt([
        {
          type: 'input',

          name: 'input',
          message: 'Folder to source-code',
          default: 'src'
        },
        {
          type: 'input',

          name: 'telegs',
          message: 'Folder to marech source-code',
          default: 'src/marech'
        },
        {
          type: 'input',
          
          name: 'output',
          message: 'Folder to final-code',
          default: 'dist'
        }
      ])
      .then(answers => {
        const configs = marechalConfigs.simpleConfig(answers);

        utilFile.createFile('marech-config.js', configs, true);
      });
  });


program
  .command('compile')
  .description('Compile marech')
  .option('-c, --config [filename]', 'Set custom marech-config file')
  .action((cmd) => {
    let configFile = './marech-config.js';
    if(cmd.config && cmd.config !== true) {
      configFile = cmd.config;
    }
    const resolvedConfigFile = path.join(process.cwd(), configFile);
    
    // MarechalFiles
    const userConfigs = require(resolvedConfigFile);

    // Configs with relative path's
    const relativeConfigs = marechalConfigs.mergeConfigs(userConfigs);
    // Configs with real path location
    const resolvedConfigs = marechalConfigs.resolveConfig(relativeConfigs);

    // Get all files matched by input

    glob(path.join(relativeConfigs.input.path, relativeConfigs.input.files), {ignore: path.join(relativeConfigs.telegs.path, '/**/*.html')}, (err, files) => {
      if(err) throw err;
      // Go to each input file
      files.forEach((file) => {
        marechalByFile.byFileAndCreate(file, relativeConfigs, resolvedConfigs);
      });
    });
  });

program.parse(process.argv);



