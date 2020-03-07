import generateDifference from '../src/index';
import path from 'path';

const getPath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

let jsonDifference

beforeEach(() => {
  jsonDifference = [
    {
      actionName: 'added',
      key: 'verbose',
      oldValue: null,
      newValue: true,

    },
    {
      actionName: 'unchanged',
      key: 'host',
      oldValue: 'hexlet.io',
      newValue: 'hexlet.io'
    },
    { actionName: 'changed', key: 'timeout', oldValue: 50, newValue: 20 },
    {
      actionName: 'deleted',
      key: 'proxy',
      oldValue: '123.234.53.22',
      newValue: null
    },
    { actionName: 'deleted', key: 'follow', oldValue: false, newValue: null }
  ]
});

test.each([
  ['before.json', 'after.json', jsonDifference],
  ['before.yml', 'after.yml', jsonDifference],
  ['before.ini', 'after.ini', jsonDifference],
])('tests files', (before, after, expected) => {
  expect(generateDifference(getPath(before), getPath(after))).toEqual(jsonDifference)
  jsonDifference[0] = {};
  jsonDifference[2] = { ...jsonDifference[2], oldValue: 'testing', newValue: 'testing' };
  expect(generateDifference(getPath(before), getPath(after))).not.toEqual(jsonDifference)
})