// Required libs
import path from 'path';
import fs from 'fs';
import { Command } from 'commander';
import inquirer from 'inquirer';

import marechalConfigs from 'marech-core/dist/marechal/marechal-configs';

// Questions to user
const questions = [
  {
    type: 'input',

    name: 'input',
    message: 'Input folder',
    default: 'src',
  },
  {
    type: 'input',

    name: 'components',
    message: 'Component\'s folder',
    default: 'src/marech',
  },
  {
    type: 'input',

    name: 'output',
    message: 'Output folder',
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
        if (!fs.existsSync(path.resolve(dir))) {
          fs.mkdirSync(path.resolve(dir));
        }
        workDir = dir;
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
            const configStr = JSON.stringify(configs, null, '  ');
            fs.writeFileSync(path.join(workDir, `${filename}.json`), configStr);
          });
      } else {
        // Export and create config file
        const configStr = JSON.stringify(configs, null, '  ');
        fs.writeFileSync(path.join(workDir, `${filename}.json`), configStr);
      }

    });
};

export default init;
