import { expect } from 'chai';
import { TreeNode, arrayToTree } from '../core/Tree.js';

/**
 * 124. Binary Tree Maximum Path Sum
 * Hard
 * Tree, DFS
 * Time complexity: O(n), Space complexity: O(n)
 * 
 * Thought:
 * 1. We can treat a `path` as a subtree.
 * 2. The path sum of a subtree is the `left child + right child + root`.
 *    (But we can abandon the child node if it is negative.)
 * 2-1. A child should only report its maximum grandchild to its parent.
 *      e.g. The following is not a valid path
 *           a 
 *          / \
 *         b   c
 *        / \
 *       d   e
 *      The node B should choose to report D or E to its parent A.
 * 3. Take DFS traversal to evaluate each subtree from leaf to root.
 */
function maxPathSum(root: TreeNode | null): number {
  if (!root) return 0;
  let globalMax = -Infinity;
  travel(root);
  return globalMax;
  function travel(node: TreeNode): number {
    let lMax = node.left ? travel(node.left) : 0;
    let rMax = node.right ? travel(node.right) : 0;
    // If the child node is negative, don't pick it
    lMax = Math.max(lMax, 0);
    rMax = Math.max(rMax, 0);
    // Calculate the local maximum
    const localMax = lMax + rMax + node.val;
    // Update the global maximum
    globalMax = Math.max(globalMax, localMax);
    // 
    return Math.max(lMax, rMax) + node.val;
  }
}

expect(maxPathSum(arrayToTree([1, 2, 3]))).to.equal(6);
expect(maxPathSum(arrayToTree([-10, 9, 20, null, null, 15, 7]))).to.equal(42);
// edge case
expect(maxPathSum(arrayToTree([]))).to.equal(0);
expect(maxPathSum(arrayToTree([3]))).to.equal(3);
expect(maxPathSum(arrayToTree([-3]))).to.equal(-3);
// special rule: path does not have to reach the leaf node
// which means we can abandon the child node if it is negative
expect(maxPathSum(arrayToTree([2, -1]))).to.equal(2);
