#!/usr/bin/env node

// Required libs
const path = require('path');
const info = require(path.join(__dirname, 'package.json'));
const program = require('commander'); // cli
const cliCommands = require('./src/cli/cli'); // cli-commands


// Initialize cli
program
  .version(info.version)
  .description(`Marech v${info.version}`);


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
