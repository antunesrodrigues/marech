// Required libs
const path = require('path');
const inquirer = require('inquirer');
const marechalUtil = require('../../../lib/util');
const marechalConfigs = require('../../marechal/marechal-configs');

// Questions to user
const questions = [
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
  },
  {
    type: 'input',
    
    name: 'filename',
    message: 'Configuration filename',
    default: 'marech-config'
  }
  
];

const init = (program) => {
  program
    .command('init [dir]')
    .alias('i')
    .description('Initialize marech')
    .option('-y, --yes', 'Use default answers')
    .action(async (dir, opt) => {
      // Get default marech configs
      let configs = marechalConfigs.defaultConfigs;
      
      // Set default filename and work-dir
      let filename = marechalConfigs.defaultNames.filename;
      let workDir = './';

      // Verify if isset 'dir' command
      if(dir) {
        // Create path if not exists
        if(marechalUtil.createPath(path.resolve(dir))) {
          workDir = dir;
        }
      } else {
        workDir = path.resolve(workDir);
      }

      // Yes option ignore questions and create with default answers
      // Verify if it's not defined
      if(!opt.yes) {
        // Send questions
        await inquirer.prompt(questions)
          .then(answers => {
            configs = marechalConfigs.simpleConfig(answers); 
            filename = answers.filename;           
          });
      }

      // Export and create config file
      marechalUtil.createFile(path.join(workDir, filename + '.js'), configs, true);
    });
};

module.exports = init;