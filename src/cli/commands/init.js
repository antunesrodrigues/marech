const path = require('path');
const inquirer = require('inquirer');

const marechalUtil = require('../../../lib/util');
const marechalConfigs = require('../../marechal/marechal-configs');

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
      let configs = marechalConfigs.defaultConfigs;
      let filename = 'marechal-config';
      let workDir = './';

      if(dir) {
        if(marechalUtil.createPath(path.resolve(dir))) {
          workDir = dir;
        }
      } else {
        workDir = path.resolve(workDir);
      }

      if(!opt.yes) {
        await inquirer.prompt(questions)
          .then(answers => {
            configs = marechalConfigs.simpleConfig(answers); 
            filename = answers.filename;           
          });
      }

      marechalUtil.createFile(path.join(workDir, filename + '.js'), configs, true);
    });
};

module.exports = init;