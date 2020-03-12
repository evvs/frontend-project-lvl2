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
      switch (node.action) {
        case 'added':
          return `${acc}${indent(depth)}+ ${node.name}: ${stringify(node.value, depth)}\n`;

        case 'unchanged':
          return _.has(node, 'children') ? `${acc}  ${indent(depth)}${node.name}: {
${iter(node.children, depth + 1)}}\n`
            : `${acc}${indent(depth)}  ${node.name}: ${stringify(node.value, depth)}\n`;

        case 'deleted':
          return `${acc}${indent(depth)}- ${node.name}: ${stringify(node.value, depth)}\n`;

        case 'changed':
          return `${acc}${indent(depth)}- ${node.name}: ${stringify(node.oldValue, depth)}
${indent(depth)}+ ${node.name}: ${stringify(node.newValue, depth)}\n`;
        default:
          return null;
      }
    }, '');

    return renderString;
  };

  return `{
  ${iter(tree, 0).trim()}
}`;
};

export default render;
