import generateDifference from '../src';
import path from 'path';
import fs from 'fs';


const getPathToFixture = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFixture = (filename) => fs.readFileSync(getPathToFixture(filename), 'utf-8');

const testCases = [
  [['.json', '.json'], 'tree', 'treeRes.txt'],
  [['.ini', '.ini'], 'json', 'jsonRes.txt'],
  [['.yml', '.yml'], 'plain', 'plainRes.txt'],
  [['.json', '.yml'], 'tree', 'treeRes.txt'],
  [['.yml', '.ini'], 'json', 'jsonRes.txt'],
];


test.each(testCases)('Compare two files', ([extension1, extension2], format, result) => {
  const pathToFile1 = getPathToFixture(`before${extension1}`);
  const pathToFile2 = getPathToFixture(`after${extension2}`);
  const expectedResult = readFixture(result);
  const comparisonResult = generateDifference(pathToFile1, pathToFile2, format);

  expect(comparisonResult).toEqual(expectedResult);
});
