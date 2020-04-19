import _ from 'lodash';


const valueToStr = (value) => (_.isObject(value) ? '[complex value]' : value);

const generateOutput = (path, node) => {
  const property = path.length > 1 ? path.join('.') : path;
  switch (node.type) {
    case 'added':
      return `Property '${property}' was added with value: '${valueToStr(node.newValue)}'`;
    case 'deleted':
      return `Property '${property}' was deleted`;
    case 'changed':
      return `Property '${property}' was changed from '${valueToStr(node.oldValue)}' to '${valueToStr(node.newValue)}'`;
    case 'unchanged':
      return 'unchanged';
    default:
      throw new Error(`Unknown node type: '${node.type}'!`);
  }
};

const render = (tree) => {
  const iter = (nodes, path) => nodes.map((cNode) => {
    const cPath = cNode.name;
    if (cNode.type === 'tree') {
      return [iter(cNode.children, [...path, cPath])];
    }
    return [generateOutput([...path, cPath], cNode)];
  });

  const result = _.flattenDeep(iter(tree, []))
    .filter((e) => e !== 'unchanged')
    .join('\n');

  return result;
};

export default render;
