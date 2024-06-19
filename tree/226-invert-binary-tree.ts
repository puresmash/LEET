import { expect } from 'chai';
import { TreeNode, arrayToTree, treeToArray } from '../core/Tree.js';

/**
 * 226. Invert Binary Tree
 * Easy
 * Tree, DFS
 * Time complexity: O(n), Space complexity: O(n)
 * 
 * Steps:
 * 1. Iterate the tree in DFS order
 * 2. For each node, swap the left and right children
 * 3. Do this until reach the leaf node
 */
function invertTree(root: TreeNode | null): TreeNode | null {
  function dfs(node: TreeNode) {
    if (!node.left && !node.right) return;
    const left = node.left;
    node.left = node.right;
    node.right = left;
    if (node.left) dfs(node.left);
    if (node.right) dfs(node.right);
  }
  if (root) dfs(root);
  return root;
}

let tree = arrayToTree([4, 2, 7, 1, 3, 6, 9]);
expect(treeToArray(invertTree(tree))).to.deep.equal([4, 7, 2, 9, 6, 3, 1]);
tree = arrayToTree([2, 1, 3]);
expect(treeToArray(invertTree(tree))).to.deep.equal([2, 3, 1]);
tree = arrayToTree([1, 2, 3, null, 4, 5]);
expect(treeToArray(invertTree(tree))).to.deep.equal([1, 3, 2, null, 5, 4]);
