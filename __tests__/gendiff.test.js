import generateDifference from '../src';
import path from 'path';
import render from '../src/formatters'
import { readFile } from '../src/parsers'

const getPath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test.each([
  ['beforeDeep.json', 'afterDeep.json','plainRes.txt',],
  ['beforeDeep.yml', 'afterDeep.yml','plainRes.txt',],
  ['beforeDeep.ini', 'afterDeep.ini','plainRes.txt',],
])('test plain', (before, after, expected) => {
  const expectedOutput = readFile(getPath(expected));
  expect(render(generateDifference(getPath(before), getPath(after)), 'plain')).toEqual(expectedOutput);
})

test.each([
  ['beforeDeep.json', 'afterDeep.json','jsonRes.txt',],
  ['beforeDeep.yml', 'afterDeep.yml','jsonRes.txt',],
  ['beforeDeep.ini', 'afterDeep.ini','jsonRes.txt',],
])('test json', (before, after, expected) => {
  const expectedOutput = readFile(getPath(expected));
  expect(render(generateDifference(getPath(before), getPath(after)), 'json')).toEqual(expectedOutput);
})

test.each([
  ['beforeDeep.json', 'afterDeep.json','treeRes.txt',],
  ['beforeDeep.yml', 'afterDeep.yml','treeRes.txt',],
  ['beforeDeep.ini', 'afterDeep.ini','treeRes.txt',],
])('test tree', (before, after, expected) => {
  const expectedOutput = readFile(getPath(expected));
  expect(render(generateDifference(getPath(before), getPath(after)), 'tree')).toEqual(expectedOutput);
})