import _ from 'lodash';
import { parseFileToObj, createNode } from './parser';

const path = require('path');

const actions = [
  {
    name: 'added or deleted',
    check: (afterObj, currentValue) => !_.has(afterObj, currentValue),
  },
  {
    name: 'changed',
    check: (afterObj, currentValue, beforeObj) => _.has(afterObj, currentValue)
      && beforeObj[currentValue] !== afterObj[currentValue],
  },
  {
    name: 'unchanged',
    check: (afterObj, currentValue, beforeObj) => _.has(afterObj, currentValue)
      && beforeObj[currentValue] === afterObj[currentValue],
  },
];


const getPathToFile = (file) => path.resolve(process.cwd(), `${file}`);


export default (file1, file2) => {
  const beforeObj = parseFileToObj(getPathToFile(file1));
  const afterObj = parseFileToObj(getPathToFile(file2));

  const compare = (before, after) => {
    const changedAndDeleted = Object.keys(before)
      .reduce((accumulator, key) => {
        const { name } = actions.find(({ check }) => check(after, key, before));
        const difference = name === 'added or deleted' ? createNode('deleted', key, before[key]) : createNode(name, key, before[key], after[key]);
        return [...accumulator, difference];
      }, []);

    const added = Object.keys(after)
      .filter((key) => !_.has(before, key))
      .reduce((accumulator, key) => [...accumulator, createNode('added', key, before[key], after[key])], []);

    return [...added, ...changedAndDeleted];
  };

  return compare(beforeObj, afterObj);
};
