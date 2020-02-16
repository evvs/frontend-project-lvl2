import generateDifference from '../src/genDiff';
import { parseDifference } from '../src/genDiff';
import { jsonToObject } from '../src/parse';


let jsonDifference

const beforeWay = '/mnt/d/projects/frontend-project-lvl2/__tests__/__fixtures__/before.json';
const afterWay = '/mnt/d/projects/frontend-project-lvl2/__tests__/__fixtures__/after.json';

beforeEach(() => {
    jsonDifference = [
        {
            action: 'add',
            key: 'verbose',
            oldValue: '',
            newValue: true,

        },
        {
            action: 'same',
            key: 'host',
            oldValue: 'hexlet.io',
            newValue: 'hexlet.io'
        },
        { action: 'change', key: 'timeout', oldValue: 50, newValue: 20 },
        {
            action: 'delete',
            key: 'proxy',
            oldValue: '123.234.53.22',
            newValue: ''
        },
        { action: 'delete', key: 'follow', oldValue: false, newValue: '' }
    ]
});

test('test generateDifference', () => {
    expect(generateDifference(beforeWay, afterWay)).toEqual(jsonDifference)
    jsonDifference[0] = {};
    jsonDifference[2] = { ...jsonDifference[2], oldValue: 'testing', newValue: 'testing' };
    expect(generateDifference(beforeWay, afterWay)).not.toEqual(jsonDifference)
})

test('test parseDifference', () => {
    expect(parseDifference('add')('testkey', 1, 2)).toEqual(
        {
            action: 'add',
            key: 'testkey',
            oldValue: 1,
            newValue: 2
        }
    )
    expect(parseDifference('add')('testkey', 1, 2)).not.toEqual({})
})