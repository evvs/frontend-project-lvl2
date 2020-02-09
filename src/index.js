#!/usr/bin/env node
import generateDifference from './genDiff';
import render from './render'

const program = require('commander');

program
  .version('0.0.1', '-v, --vers', 'output the version number')
  .option('-f, --format [type]', 'output format')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<firstPath> <secondPath>')
  .action((firstPath, secondPath) => {
    const before = firstPath;
    const after = secondPath;

    const difference = generateDifference(before, after)

    render(difference)
  });
program.parse(process.argv);
