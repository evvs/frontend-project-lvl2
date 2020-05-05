import _ from 'lodash';
import path from 'path';
import fs from 'fs';
import parse from './parsers';
import render from './formatters';

const readFile = (pathToFile) => {
  const currentPath = path.resolve(process.cwd(), `${pathToFile}`);
  const data = fs.readFileSync(currentPath, 'utf-8');

  return data;
};

const makeNode = (type, name, oldValue = null, newValue = null, children = []) => ({
  type, name, oldValue, newValue, children,
});

const buildAst = (objBefore, objAfter) => {
  const keysUnion = _.union(_.keys(objBefore), _.keys(objAfter));

  return keysUnion.map((key) => {
    if (!_.has(objAfter, key)) {
      return makeNode('deleted', key, objBefore[key]);
    }
    if (!_.has(objBefore, key)) {
      return makeNode('added', key, null, objAfter[key]);
    }
    if (_.isObject(objBefore[key]) && _.isObject(objAfter[key])) {
      return makeNode('tree', key, null, null, buildAst(objBefore[key], objAfter[key]));
    }
    if (objBefore[key] === objAfter[key]) {
      return makeNode('unchanged', key, objBefore[key]);
    }
    if (objBefore[key] !== objAfter[key]) {
      return makeNode('changed', key, objBefore[key], objAfter[key]);
    }
    throw new Error(`${key} is missing in the data`);
  });
};

export default (pathToFile1, pathToFile2, format = 'tree') => {
  const dataBefore = readFile(pathToFile1);
  const objBefore = parse(path.extname(pathToFile1), dataBefore);

  const dataAfter = readFile(pathToFile2);
  const objAfter = parse(path.extname(pathToFile2), dataAfter);

  const ast = buildAst(objBefore, objAfter);
  return render(ast, format);
};
