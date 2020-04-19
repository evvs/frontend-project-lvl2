import _ from 'lodash';
import parseFile from './parsers';
import render from './formatters';

const path = require('path');


const getPathToFile = (file) => path.resolve(process.cwd(), `${file}`);

const makeNode = (type, name, oldValue = null, newValue = null, children = []) => ({
  type, name, oldValue, newValue, children,
});

const compare = (before, after) => {
  const keysUnion = _.union([...Object.keys(before), ...Object.keys(after)]);
  return keysUnion.map((key) => {
    if (_.isObject(before[key]) && _.isObject(after[key])) {
      return makeNode('tree', key, null, null, compare(before[key], after[key]));
    }
    if (!_.has(after, key)) {
      return makeNode('deleted', key, before[key]);
    }
    if (!_.has(before, key)) {
      return makeNode('added', key, null, after[key]);
    }
    if (_.has(before, key) && _.has(after, key) && before[key] === after[key]) {
      return makeNode('unchanged', key, before[key]);
    }
    if (_.has(before, key) && _.has(after, key) && before[key] !== after[key]) {
      return makeNode('changed', key, before[key], after[key]);
    }
    throw new Error('Unexpected condition!');
  });
};

const buildAst = (file1, file2) => {
  const parsedFile1 = parseFile(getPathToFile(file1));
  const parsedFile2 = parseFile(getPathToFile(file2));

  return compare(parsedFile1, parsedFile2);
};


export default (pathToFile1, pathToFile2, format = 'tree') => render(buildAst(pathToFile1, pathToFile2), format);
