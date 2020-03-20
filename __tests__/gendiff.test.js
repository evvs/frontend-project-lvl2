import generateDifference from '../src';
import path from 'path';
import render from '../src/formatters'
import { readFile } from '../src/parsers'

const getPath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const getExpected = (file) => readFile(getPath(file));

test('tests', () => {
  expect(render(generateDifference(getPath('beforeDeep.json'), getPath('afterDeep.json')), 'tree'))
  .toEqual(getExpected('treeRes.txt'));
  expect(render(generateDifference(getPath('beforeDeep.ini'), getPath('afterDeep.ini')), 'plain'))
  .toEqual(getExpected('plainRes.txt'));
  expect(render(generateDifference(getPath('beforeDeep.yml'), getPath('afterDeep.yml')), 'json'))
  .toEqual(getExpected('jsonRes.txt'));
  expect(render(generateDifference(getPath('beforeDeep.json'), getPath('afterDeep.yml')), 'plain'))
  .toEqual(getExpected('plainRes.txt'));
})