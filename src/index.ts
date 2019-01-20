#!/usr/bin/env node

// Required libs
import path from 'path';
import commander from 'commander'; // cli
import cliCommands from './marech/cli-commands'; // cli-commands

const packageLocation = path.join(__dirname, '../package.json');
const info = require(packageLocation);

// Initialize cli
commander
  .version(info.version);
//  .description(`Marech v${info.version}`);

// Each cli-command are on cliCommands
// Import to use it
cliCommands.init(commander);
cliCommands.compile(commander);

// Use args to cli
commander.parse(process.argv);

// If no command specified
if (!process.argv.slice(2).length) {
  // Send help message
  commander.outputHelp();
}
