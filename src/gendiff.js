import genDiff from '.';

const commander = require('commander');

const program = new commander.Command();

export default () => {
  program
    .version('0.0.1', '-v, --vers', 'output the version number')
    .description('Compares two configuration files and shows a difference.')
    .arguments('<firstPath> <secondPath>')
    .option('-f, --format [type]', 'output format')
    .action((firstPath, secondPath) => {
      const differences = genDiff(firstPath, secondPath);
      return differences;
    })
    .parse(process.argv);
};
