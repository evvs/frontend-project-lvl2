import _ from 'lodash';
import { parseFile } from './parsers';

const path = require('path');


const getPathToFile = (file) => path.resolve(process.cwd(), `${file}`);


export default (file1, file2) => {
  const parsedFile1 = parseFile(getPathToFile(file1));
  const parsedFile2 = parseFile(getPathToFile(file2));

  const compare = (before, after) => {
    const keysUnion = _.union([...Object.keys(before), ...Object.keys(after)]);
    return keysUnion.map((key) => {
      if (_.isObject(before[key]) && _.isObject(after[key])) {
        return {
          action: 'unchanged',
          name: key,
          children: compare(before[key], after[key]),
        };
      }

      if (!_.has(after, key)) {
        return {
          action: 'deleted',
          name: key,
          value: before[key],
        };
      }
      if (!_.has(before, key)) {
        return {
          action: 'added',
          name: key,
          value: after[key],
        };
      }
      if (_.has(before, key) && _.has(after, key) && before[key] === after[key]) {
        return {
          action: 'unchanged',
          name: key,
          value: before[key],
        };
      }
      if (_.has(before, key) && _.has(after, key) && before[key] !== after[key]) {
        return {
          action: 'changed',
          name: key,
          oldValue: before[key],
          newValue: after[key],
        };
      }
      return null;
    });
  };

  return compare(parsedFile1, parsedFile2);
};
