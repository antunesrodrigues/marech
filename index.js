#!/usr/bin/env node

// Required libs
const program = require('commander');
const cliCommands = require('./src/cli/cli');


// Initialize cli
program
  .version('1.0.0')
  .description('HTML Pre-compiler');


// Each cli-command are on cliCommands
// Import to use on program
cliCommands.init(program);
cliCommands.compile(program);


// Use args to cli
program.parse(process.argv);

// If no command specified
if (!process.argv.slice(2).length) {
  program.outputHelp();
}
