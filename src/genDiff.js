import _ from 'lodash'
import { jsonToObject } from './parse'
import actionType from './actions'

export const parseDifference = (action) => {

    const template = {
        action: action,
        key: '',
        oldValue: '',
        newValue: ''
    }

    return (key, oldValue = '', newValue = '') => ({ ...template, key, oldValue, newValue })
}

const generateDifference = (before, after) => {

    const beforeObj = jsonToObject(before);
    const afterObj = jsonToObject(after);

    const compare = (obj1, obj2) => {

        const changedAndDeleted = Object.keys(obj1)
            .reduce((accumulator, key) => {
                const { name } = actionType.find(({ check }) => check(obj2, key, obj1))

                const difference = parseDifference(name)(key, obj1[key], obj2[key])

                return [...accumulator, difference]
            }, [])

        const added = Object.keys(obj2)
            .filter(key => !_.has(obj1, key))
            .reduce((accumulator, key) => [...accumulator, parseDifference('add')(key, obj1[key], obj2[key])], [])

        return [...added, ...changedAndDeleted]
    }

    return compare(beforeObj, afterObj);
};

export default generateDifference;