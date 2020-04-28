import _ from 'lodash';
import path from 'path';
import fs from 'fs';
import getParser from './parsers';
import render from './formatters';

const getPathToFile = (pathToFile) => path.resolve(process.cwd(), `${pathToFile}`);

const getParsedContent = (pathToContent) => {
  const currentPath = getPathToFile(pathToContent);
  const content = fs.readFileSync(currentPath, 'utf-8');
  const parse = getParser(path.extname(currentPath));
  const parsedContent = parse(content);
  return parsedContent;
};

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
    if (_.isObject(before[key]) && _.isObject(after[key])) {
      return makeNode('tree', key, null, null, compare(before[key], after[key]));
    }
    if (before[key] === after[key]) {
      return makeNode('unchanged', key, before[key]);
    }
    if (before[key] !== after[key]) {
      return makeNode('changed', key, before[key], after[key]);
    }
    throw new Error(`${key} is missing in both files`);
  });
};

const buildAst = (fileBefore, fileAfter) => {
  const parsedContent1 = getParsedContent(fileBefore);
  const parsedContent2 = getParsedContent(fileAfter);

  return compare(parsedContent1, parsedContent2);
};


export default (pathToFile1, pathToFile2, format = 'tree') => render(buildAst(pathToFile1, pathToFile2), format);
