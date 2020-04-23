import _ from 'lodash';

const indent = (depth) => `${' '.repeat(4 * depth)}`;

const stringify = (nodeValue, depth) => {
  if (!_.isObject(nodeValue)) {
    return nodeValue;
  }

  const result = Object.keys(nodeValue)
    .map((key) => {
      const value = _.isObject(nodeValue[key]) ? stringify(nodeValue[key], depth + 1).join('\n') : `${nodeValue[key]}`;
      return `${indent(depth + 1)}  ${key}: ${value}`;
    });
  return ['{', result, `${indent(depth)}  }`].join('\n');
};

const generateOutput = (node, depth, iter) => {
  const { type } = node;

  const nodeTypes = {
    tree: `  ${indent(depth)}${node.name}: {\n${iter(node.children, depth + 1)}\n${indent(depth)}  }`,
    added: `${indent(depth)}+ ${node.name}: ${stringify(node.newValue, depth)}`,
    deleted: `${indent(depth)}- ${node.name}: ${stringify(node.oldValue, depth)}`,
    changed: `${indent(depth)}- ${node.name}: ${stringify(node.oldValue, depth)}\n${indent(depth)}+ ${node.name}: ${stringify(node.newValue, depth)}`,
    unchanged: `${indent(depth)}  ${node.name}: ${stringify(node.oldValue, depth)}`,
  };

  return nodeTypes[type];
};


const render = (tree) => {
  const iter = (nodes, depth) => nodes.map((node) => generateOutput(node, depth, iter)).join('\n');
  const result = `{\n  ${iter(tree, 0).trim()}\n}`;
  return result;
};

export default render;
