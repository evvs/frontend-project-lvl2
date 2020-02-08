import _ from 'lodash'
import { jsonToObject } from './parse'

const parseDifference = (action) => {

    const template = {
        action: action,
        key: '',
        oldValue: '',
        newValue: ''
    }

    return (key, oldValue = '', newValue = '') => {

        switch (action) {
            case 'delete':
                return { ...template, key, oldValue, newValue }
                break;
            case 'add':
                return { ...template, key, oldValue, newValue }
                break;
            case 'change':
                return { ...template, key, oldValue, newValue }
                break;
            case 'same': {
                return { ...template, key, oldValue, newValue }
                break;
            }
            default:
                return;
        }
    }
}


const actionType = [
    {
        name: 'absent',
        check: (beforeObj, afterObj, currentValue) => !_.has(afterObj, currentValue),
    },
    {
        name: 'change',
        check: (beforeObj, afterObj, currentValue) => _.has(afterObj, currentValue) && beforeObj[currentValue] !== afterObj[currentValue],
    },
    {
        name: 'same',
        check: (beforeObj, afterObj, currentValue) => _.has(afterObj, currentValue) && beforeObj[currentValue] === afterObj[currentValue],
    }
];


const generateDifference = (before, after) => {

    const beforeObj = jsonToObject(before);
    const afterObj = jsonToObject(after);

    const compare = (obj1, obj2) => {

        const changedAndDeleted = Object.keys(obj1)
            .reduce((accumulator, key) => {
                const { name } = actionType.find(({ check }) => check(obj1, obj2, key))

                const difference = name === 'absent' ? parseDifference('delete')(key, obj1[key], obj2[key]) : parseDifference(name)(key, obj1[key], obj2[key])

                return difference.action === 'same' ? accumulator : [...accumulator, difference]
            }, [])

        const added = Object.keys(obj2)
            .filter(key => !_.has(obj1, key))
            .reduce((accumulator, key) => [...accumulator, parseDifference('add')(key, obj1[key], obj2[key])], [])

        return [...added, ...changedAndDeleted]
    }

    return compare(beforeObj, afterObj);
};

export default generateDifference;