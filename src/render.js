import actionType from './actions';
import generateDifference from './genDiff';

const renderDifference = (difference, renderType = 'renderToString') => {

    switch (renderType) {
        case ('renderToString'):
            const result = difference
                .reduce((accumulator, processedDifference) => {
                    const action = actionType.find(({ name }) => name === processedDifference.action);
                    const render = action[renderType];
                    return `${accumulator}${render(processedDifference)}`
                }, '')

            console.log(result);
            break;

        default:
            break;
    }
    return;
}

export default renderDifference;
