import { expect } from 'chai';
import { TreeNode, arrayToTree } from '../core/Tree.js';

/**
 * 230. Kth Smallest Element in a BST
 * Medium
 * Tree, DFS, Binary Search Tree
 * Time complexity: O(n), Space complexity: O(n)
 * 
 * Thought:
 * 1. Traverse the tree inorder and count, until reach the kth element.
 * 2. Recursion cannot be stopped when getting the answer, try to add some short circuit.
 */
function kthSmallest(root: TreeNode | null, k: number): number {
  let result = 0;
  travel(root!);
  function travel(node: TreeNode) {
    // try to short circuit the recursion
    if (k === 0) return;
    node.left && travel(node.left);
    // try to short circuit the recursion of the right branch
    if (k === 0) return;
    if (--k === 0) {
      result = node.val;
    }
    node.right && travel(node.right);
  }
  return result;
}

expect(kthSmallest(arrayToTree([3, 1, 4, null, 2]), 1)).to.equal(1);
expect(kthSmallest(arrayToTree([5, 3, 6, 2, 4, null, null, 1]), 3)).to.equal(3);
