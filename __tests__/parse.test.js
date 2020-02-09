import { jsonToObject } from '../src/parse';

const beforeWay = '/mnt/d/projects/frontend-project-lvl2/__tests__/__fixtures__/before.json';
const afterWay = '/mnt/d/projects/frontend-project-lvl2/__tests__/__fixtures__/after.json';

let beforeObject
let afterObject

beforeEach(() => {
    beforeObject = {
        "host": "hexlet.io",
        "timeout": 50,
        "proxy": "123.234.53.22",
        "follow": false
    }

    afterObject = {
        "timeout": 20,
        "verbose": true,
        "host": "hexlet.io"
    }
});

test('test function jsonToObject', () => {
    expect(jsonToObject(beforeWay)).toMatchObject(beforeObject)
    expect(jsonToObject(afterWay)).toMatchObject(afterObject)
    beforeObject.earth = 77
    afterObject.moon = 55
    expect(jsonToObject(beforeWay)).not.toMatchObject(beforeObject)
    expect(jsonToObject(afterWay)).not.toMatchObject(afterObject)
});
