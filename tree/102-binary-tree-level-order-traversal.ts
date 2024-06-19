import { expect } from 'chai';
import { TreeNode, arrayToTree } from '../core/Tree.js';

/**
 * 102. Binary Tree Level Order Traversal
 * Medium
 * Tree, BFS
 * Time complexity: O(n), Space complexity: O(w), w is the maximum width of the tree
 * Steps:
 * 1. Start from root, iterate nodes in the current tree level.
 * 2. Collect `node.val` in the same level through the iteration.
 * 3. During the same iteration, add all children nodes to the `next` array.
 * 4. When the current level is empty, load all the nodes in `next`.
 */
function levelOrder(root: TreeNode | null): number[][] {
  const result = [] as number[][];
  if (!root) return result;
  // Start from the root
  let next = [root] as TreeNode[];
  while (next.length) {
    // Switch to next level, load all nodes
    const current = next;
    next = [];
    // Group all nodes in the current level
    const group = current.map(node => {
      // Add children nodes to the next level
      if (node.left) next.push(node.left);
      if (node.right) next.push(node.right);
      // Extract values from the current level
      return node.val;
    })
    result.push(group);
  }
  return result;
}

expect(levelOrder(arrayToTree([3, 9, 20, null, null, 15, 7]))).to.deep.equal([[3], [9, 20], [15, 7]]);
expect(levelOrder(arrayToTree([3, 9, 20, 15, null, 7]))).to.deep.equal([[3], [9, 20], [15, 7]]);
expect(levelOrder(arrayToTree([1]))).to.deep.equal([[1]]);
expect(levelOrder(arrayToTree([]))).to.deep.equal([]);
