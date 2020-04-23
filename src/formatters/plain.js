import _ from 'lodash';


const valueToStr = (value) => (_.isObject(value) ? '[complex value]' : value);

const generateOutput = (node, path, iter) => {
  const property = path.length > 1 ? path.join('.') : path;
  const { type } = node;

  const nodeTypes = {
    tree: iter(node.children, path),
    added: `Property '${property}' was added with value: '${valueToStr(node.newValue)}'`,
    deleted: `Property '${property}' was deleted`,
    changed: `Property '${property}' was changed from '${valueToStr(node.oldValue)}' to '${valueToStr(node.newValue)}'`,
    unchanged: 'unchanged',
  };

  return nodeTypes[type];
};

const render = (tree) => {
  const iter = (nodes, path) => nodes.map((currentNode) => {
    const { name } = currentNode;
    return generateOutput(currentNode, [...path, name], iter);
  });

  const result = _.flattenDeep(iter(tree, []))
    .filter((e) => e !== 'unchanged')
    .join('\n');

  return result;
};

export default render;
