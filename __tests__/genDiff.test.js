import generateDifference from '../src/genDiff';
import { jsonToObject } from '../src/parse';


let jsonDifference

const beforeWay = '/mnt/d/projects/frontend-project-lvl2/__tests__/data/before.json';
const afterWay = '/mnt/d/projects/frontend-project-lvl2/__tests__/data/after.json';

beforeEach(() => {
    jsonDifference = [
        {
            action: 'add',
            key: 'verbose',
            oldValue: '',
            newValue: true,

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