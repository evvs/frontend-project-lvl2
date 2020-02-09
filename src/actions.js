import _ from 'lodash'

export default [
    {
        name: 'delete',
        check: (afterObj, currentValue) => !_.has(afterObj, currentValue),
        renderToString: (difference) => `- ${difference.key}: ${difference.oldValue} \n`
    },
    {
        name: 'change',
        check: (afterObj, currentValue, beforeObj) => _.has(afterObj, currentValue) && beforeObj[currentValue] !== afterObj[currentValue],
        renderToString: (difference) => `+ ${difference.key}: ${difference.newValue}
- ${difference.key}: ${difference.oldValue} \n`
    },
    {
        name: 'same',
        check: (afterObj, currentValue, beforeObj) => _.has(afterObj, currentValue) && beforeObj[currentValue] === afterObj[currentValue],
        renderToString: (difference) => `  ${difference.key}: ${difference.oldValue} \n`
    },
    {
        name: 'add',
        check: (afterObj, currentValue) => !_.has(afterObj, currentValue),
        renderToString: (difference) => `+ ${difference.key}: ${difference.newValue} \n`
    }
];