#!/usr/bin/env node

const program = require('commander');

program
  .version('0.0.1', '-v, --vers', 'output the version number')
  .option('-f, --format [type]', 'output format')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<firstPath> <secondPath>')
  .action((firstPath, secondPath) => {
    const before = firstPath;
    const after = secondPath;
  });
program.parse(process.argv);
