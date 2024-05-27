import { TreeNode, arrayToTree } from '../lib/treeUtils.js';

/**
 * @param {TreeNode} root
 * @return {number}
 */
function maxDepth(root: TreeNode | null) {
  if (!root) return 0;
  let max = 0;
  dfs(root);
  function dfs(node: TreeNode, level = 1) {
    if (level > max) max = level;
    if (node.left) dfs(node.left, level + 1);
    if (node.right) dfs(node.right, level + 1);
  }
  return max;
};

console.log(maxDepth(arrayToTree([1, 2, 3])));
