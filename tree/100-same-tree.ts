import { expect } from 'chai';
import { TreeNode, arrayToTree } from '../core/Tree.js';

/**
 * 100. Same Tree
 * Easy
 * Tree, DFS
 * Time complexity: O(n), Space complexity: O(n)
 * (Space complexity is come form the recursive stack,
 *  it can be O(logn) if the tree is balanced, O(n) if not balanced)
 * Traverse both trees at the same time, compare them during the process.
 */
function isSameTree(p: TreeNode | null, q: TreeNode | null): boolean {
  // End conditions
  // Already reach the end
  if (!p && !q) return true;
  // Node is not the same
  else if (!p || !q) return false;
  if (p.val !== q.val) return false;
  // DFS to compare left and right children
  return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
}

const tree1 = arrayToTree([1, null, 3]);
const tree2 = arrayToTree([1, 3, null]);
expect(isSameTree(tree1, tree2)).to.equal(false);
const tree3 = arrayToTree([1, 2, 3]);
const tree4 = arrayToTree([1, 2, 3]);
expect(isSameTree(tree3, tree4)).to.equal(true);
