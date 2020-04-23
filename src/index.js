import _ from 'lodash';
import path from 'path';
import parseFile from './parsers';
import render from './formatters';

const getPathToFile = (fileName) => path.resolve(process.cwd(), `${fileName}`);

const makeNode = (type, name, oldValue = null, newValue = null, children = []) => ({
  type, name, oldValue, newValue, children,
});

const compare = (before, after) => {
  const keysUnion = _.union(_.keys(before), _.keys(after));

  return keysUnion.map((key) => {

    if (!_.has(after, key)) {
      return makeNode('deleted', key, before[key]);
    }
    if (!_.has(before, key)) {
      return makeNode('added', key, null, after[key]);
    }
    if (before[key] === after[key]) {
      return makeNode('unchanged', key, before[key]);
    }
    if (before[key] !== after[key]) {
      return makeNode('changed', key, before[key], after[key]);
    }
    if (_.isObject(before[key]) && _.isObject(after[key])) {
      return makeNode('tree', key, null, null, compare(before[key], after[key]));
    }
    throw new Error('Unexpected condition!');
  });
};

const buildAst = (pathToFileBefore, pathToFileAfter) => {
  const parsedFile1 = parseFile(getPathToFile(pathToFileBefore));
  const parsedFile2 = parseFile(getPathToFile(pathToFileAfter));

  return compare(parsedFile1, parsedFile2);
};


export default (pathToFile1, pathToFile2, format = 'tree') => render(buildAst(pathToFile1, pathToFile2), format);
