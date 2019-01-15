#!/usr/bin/env node

// Required
const program = require('commander');
// Marech 
const cliCommands = require('./src/cli/cli');

// Initialize cli
program
  .version('1.0.0');

// Import cli commands to work 
cliCommands.init(program);
cliCommands.compile(program);


// Use args to cli work
program.parse(process.argv);