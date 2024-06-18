import { expect } from 'chai';
import { TreeNode, arrayToTree } from '../core/Tree.js';

/**
 * 104. Maximum Depth of Binary Tree
 * Easy
 * Tree, DFS
 * Time complexity: O(n), Space complexity: O(n), since every node will be visited once
 * Each time visit a child node, increase the level by 1, and compare it with the max level.
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
}

expect(maxDepth(arrayToTree([3, 9, 20, null, null, 15, 7]))).to.equal(3);
expect(maxDepth(arrayToTree([1, null, 2]))).to.equal(2);
expect(maxDepth(null)).to.equal(0);
