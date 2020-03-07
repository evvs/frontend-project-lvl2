import generateDifference from '../src/index';
import path from 'path';

const setPath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const beforeWay = setPath('before.json');
const afterWay = setPath('after.json');
const beforeWayYaml = setPath('before.yml')
const afterWayYaml = setPath('after.yml');

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

test('test generateDifference JSON', () => {
  expect(generateDifference(beforeWay, afterWay)).toEqual(jsonDifference)
  jsonDifference[0] = {};
  jsonDifference[2] = { ...jsonDifference[2], oldValue: 'testing', newValue: 'testing' };
  expect(generateDifference(beforeWay, afterWay)).not.toEqual(jsonDifference)
})
test('test generateDifference YAML', () => {
  expect(generateDifference(beforeWayYaml, afterWayYaml)).toEqual(jsonDifference)
  jsonDifference[0] = {};
  jsonDifference[2] = { ...jsonDifference[2], oldValue: 'testing', newValue: 'testing' };
  expect(generateDifference(beforeWayYaml, afterWayYaml)).not.toEqual(jsonDifference)
})