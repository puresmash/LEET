import { expect } from 'chai';
import { TreeNode, arrayToTree } from '../core/Tree.js';

/**
 * 112. Path Sum
 * Easy
 * Tree, DFS
 * Time complexity: O(n), Space complexity: O(n)
 * https://leetcode.com/problems/path-sum/
 * 
 * Visit each node recursively, check the sum when reaching a leaf node.
 * If any path matches the target sum, return true.
 * Else return false.
 */
function hasPathSum(root: TreeNode | null, targetSum: number): boolean {
  // empty tree
  if (!root) return false;
  return travel(root, 0);
  function travel(node: TreeNode, prevSum: number): boolean {
    const sum = prevSum + node.val;
    // A leaf is a node with no children, so only check the sum when neither left nor right has a child.
    if (!node.left && !node.right && sum === targetSum) {
      return true;
    }
    return (!!node.left && travel(node.left, sum)) || (!!node.right && travel(node.right, sum));
  }
}

expect(hasPathSum(arrayToTree([1, 2, 3]), 3)).to.be.true;
expect(hasPathSum(arrayToTree([1, 2, 3]), 5)).to.be.false;
expect(hasPathSum(arrayToTree([5, 4, 8, 11, null, 13, 4, 7, 2, null, null, null, 1]), 22)).to.be.true;
// edge case
expect(hasPathSum(arrayToTree([]), 0)).to.be.false;
