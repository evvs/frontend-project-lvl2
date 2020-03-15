import treeRender from './tree';
import plainRender from './plain';
import toJsonRender from './toJson';

const renders = {
  tree: treeRender,
  plain: plainRender,
  json: toJsonRender,
};

export default (tree, format = 'tree') => renders[format](tree);
