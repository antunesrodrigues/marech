const inquirer = require('inquirer');

const utilFile = require('../../../lib/utilities/file');
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
    .action(() => {
      inquirer
        .prompt(questions)
        .then(answers => {
          const configs = marechalConfigs.simpleConfig(answers);

          utilFile.createFile(answers.filename + '.js', configs, true);
        });
    });
};

module.exports = init;