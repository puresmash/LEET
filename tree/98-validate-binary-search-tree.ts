import { expect } from 'chai';
import { TreeNode, arrayToTree } from '../core/Tree.js';

/**
 * 98. Validate Binary Search Tree
 * Medium
 * BST, DFS
 * Time complexity: O(n), Space complexity: O(n)
 * 
 * For each node in the BST,
 * => if it is at the left child, update the upper bound to its parent value
 * =>                right child, update the lower bound to its parent value
 * Beware, not only consider its parent, also consider all its ancestors,
 */
function isValidBST(root: TreeNode | null, upBound = Infinity, lowBound = -Infinity): boolean {
  if (!root) return true;
  if (root.val >= upBound || root.val <= lowBound) return false;
  return isValidBST(root.left, root.val, lowBound) && isValidBST(root.right, upBound, root.val);
}

// Basic comparison
expect(isValidBST(arrayToTree([2, 1, 3]))).to.equal(true);
expect(isValidBST(arrayToTree([5, 1, 4, null, null, 3, 6]))).to.equal(false);
// Consider all ancestors
expect(isValidBST(arrayToTree([5, 4, 6, null, null, 3, 7]))).to.equal(false);
// Edge case
expect(isValidBST(arrayToTree([]))).to.equal(true);
expect(isValidBST(arrayToTree([1]))).to.equal(true);
  // Not unique
expect(isValidBST(arrayToTree([1, 1]))).to.equal(false);
