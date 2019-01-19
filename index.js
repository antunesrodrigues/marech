#!/usr/bin/env node

// Required libs
const path = require('path');
const program = require('commander'); // cli
const cliCommands = require('./src/cli/cli'); // cli-commands

const packageLocation = path.join(__dirname, 'package.json');
// eslint-disable-next-line import/no-dynamic-require
const info = require(packageLocation);


// Initialize cli
program
  .version(info.version);
//  .description(`Marech v${info.version}`);


// eslint-disable-next-line no-console
console.info(`Marech Version: ${info.version}\n`);

// Each cli-command are on cliCommands
// Import to use it
cliCommands.init(program);
cliCommands.compile(program);


// Use args to cli
program.parse(process.argv);

// If no command specified
if (!process.argv.slice(2).length) {
  // Send help message
  program.outputHelp();
}
