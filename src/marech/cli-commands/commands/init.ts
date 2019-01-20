// Required libs
import path from 'path';
import { Command } from 'commander';
import inquirer from 'inquirer';

import lib from '../../../lib';
import marechalConfigs from '../../marechal/marechal-configs';

// Questions to user
const questions = [
  {
    type: 'input',

    name: 'input',
    message: 'Folder to source-code',
    default: 'src',
  },
  {
    type: 'input',

    name: 'telegs',
    message: 'Folder to marech source-code',
    default: 'src/marech',
  },
  {
    type: 'input',

    name: 'output',
    message: 'Folder to final-code',
    default: 'dist',
  },
  {
    type: 'input',

    name: 'filename',
    message: 'Configuration filename',
    default: 'marech-config',
  },

];

const init = (commander:Command) => {
  commander
    .command('init [dir]')
    .alias('i')
    .description('Initialize marech')
    .option('-y, --yes', 'Use default answers')
    .action((dir, opt) => {
      // Get default marech configs
      let configs = marechalConfigs.defaultConfigs();

      // Set default filename and work-dir
      let { filename } = marechalConfigs.defaultNames;
      let workDir = './';

      // Verify if isset 'dir' command
      if (dir) {
        // Create path if not exists
        if (lib.disk.folder.createPath(path.resolve(dir))) {
          workDir = dir;
        }
      } else {
        workDir = path.resolve(workDir);
      }

      // Yes option ignore questions and create with default answers
      // Verify if it's not defined
      if (!opt.yes) {
        // Send questions
        inquirer.prompt(questions)
          .then((answers:any) => {
            configs = marechalConfigs.simpleConfig(answers);
            ({ filename } = answers);

            // Export and create config file
            lib.disk.file.createFile(path.join(workDir, `${filename}.json`), configs);
          });
      } else {
        // Export and create config file
        lib.disk.file.createFile(path.join(workDir, `${filename}.json`), configs);
      }

    });
};

export default init;
