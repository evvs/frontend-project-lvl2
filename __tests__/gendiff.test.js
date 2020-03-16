import generateDifference from '../src/index';
import path from 'path';
import { withoutDeep, deep } from '../__fixtures__/expected';

const getPath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

let differences
let differenceDeep

beforeEach(() => {
  differences = [...withoutDeep]
  differenceDeep = [...deep]
});

test.each([
  ['before.json', 'after.json',],
  ['before.yml', 'after.yml',],
  ['before.ini', 'after.ini',],
  ['before.yml', 'after.json',],
  ['before.ini', 'after.yml',],
])('test without deep', (before, after) => {
  expect(generateDifference(getPath(before), getPath(after))).toEqual(differences)
  differences[0] = {};
  differences[2] = { ...withoutDeep[2], oldValue: 'testing', newValue: 'testing' };
  expect(generateDifference(getPath(before), getPath(after))).not.toEqual(differences)
})

test.each([
  ['beforeDeep.json', 'afterDeep.json',],
  ['beforeDeep.yml', 'afterDeep.yml',],
  ['beforeDeep.ini', 'afterDeep.ini',],
  ['beforeDeep.yml', 'afterDeep.json',],
  ['beforeDeep.ini', 'afterDeep.yml',],
])('test deep', (before, after) => {
  expect(generateDifference(getPath(before), getPath(after))).toEqual(differenceDeep)
  differenceDeep[0] = {};
  differenceDeep[2] = { ...withoutDeep[2], oldValue: 'testing', newValue: 'testing' };
  expect(generateDifference(getPath(before), getPath(after))).not.toEqual(differenceDeep)
})
