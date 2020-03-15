import _ from 'lodash';


const valueToStr = (value) => (_.isObject(value) ? '[complex value]' : value);

const generateOutput = (path, node) => {
  const property = path.length > 1 ? path.join('.') : path;
  switch (node.action) {
    case 'added':
      return `Property '${property}' was added with value: '${valueToStr(node.value)}'`;
    case 'deleted':
      return `Property '${property}' was deleted`;
    case 'changed':
      return `Property '${property}' was changed from '${valueToStr(node.oldValue)}' to '${valueToStr(node.newValue)}'`;
    case 'unchanged':
      return 'unchanged';
    default:
      return null;
  }
};

const render = (tree) => {
  const iter = (nodes, path) => nodes.reduce((acc, cNode) => {
    const cPath = cNode.name;
    if (_.has(cNode, 'children')) {
      return [...acc, iter(cNode.children, [...path, cPath])];
    }
    return [...acc, generateOutput([...path, cPath], cNode)];
  }, []);

  const result = _.flattenDeep(iter(tree, []))
    .filter((e) => e !== 'unchanged')
    .join('\n');

  return result;
};

export default render;
