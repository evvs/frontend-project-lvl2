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

const generateOutput = (node, acc, depth, iter) => {
  const { type } = node;

  const nodeTypes = {
    tree: `${acc}  ${indent(depth)}${node.name}: {\n${iter(node.children, depth + 1)}${indent(depth)}  }\n`,
    added: `${acc}${indent(depth)}+ ${node.name}: ${stringify(node.newValue, depth)}\n`,
    deleted: `${acc}${indent(depth)}- ${node.name}: ${stringify(node.oldValue, depth)}\n`,
    changed: `${acc}${indent(depth)}- ${node.name}: ${stringify(node.oldValue, depth)}\n${indent(depth)}+ ${node.name}: ${stringify(node.newValue, depth)}\n`,
    unchanged: `${acc}${indent(depth)}  ${node.name}: ${stringify(node.oldValue, depth)}\n`,
  };

  return nodeTypes[type];
};


const render = (tree) => {
  const iter = (nodes, depth) => nodes.reduce((acc, node) => generateOutput(node, acc, depth, iter), '');
  const result = `{\n  ${iter(tree, 0).trim()}\n}`;
  return result;
};

export default render;
