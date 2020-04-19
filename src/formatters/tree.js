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

const render = (tree) => {
  const iter = (nodes, depth) => {
    const renderString = nodes.reduce((acc, node) => {
      switch (node.type) {
        case 'added':
          return `${acc}${indent(depth)}+ ${node.name}: ${stringify(node.newValue, depth)}\n`;

        case 'unchanged':
          return `${acc}${indent(depth)}  ${node.name}: ${stringify(node.oldValue, depth)}\n`;

        case 'tree':
          return `${acc}  ${indent(depth)}${node.name}: {
${iter(node.children, depth + 1)}${indent(depth)}  }\n`;

        case 'deleted':
          return `${acc}${indent(depth)}- ${node.name}: ${stringify(node.oldValue, depth)}\n`;

        case 'changed':
          return `${acc}${indent(depth)}- ${node.name}: ${stringify(node.oldValue, depth)}
${indent(depth)}+ ${node.name}: ${stringify(node.newValue, depth)}\n`;
        default:
          throw new Error(`Unknown node type: '${node.type}'!`);
      }
    }, '');
    return renderString;
  };
  return `{\n  ${iter(tree, 0).trim()}\n}`;
};

export default render;
