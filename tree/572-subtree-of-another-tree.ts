import { expect } from 'chai';
import { TreeNode, arrayToTree, printTreeBFS } from '../core/Tree.js';

/**
 * 572. Subtree of Another Tree
 * Easy
 * Tree, Depth-first Search
 * Time complexity: O(n * m), Space complexity: O(max(n, m))
 * Where n is the number of nodes in the main tree, m is the number of nodes in the subtree
 * 
 * Thought:
 * For evert node in the main tree, check if it can be the root of the subtree
 *
 * Steps:
 * 1. Visit every node in the main tree
 * 2. Check if the current node is the same tree as the subtree, if yes, return true
 * 3. Else, check if the child node is the same tree as the subtree
 * 4. Do this recursively until found a match or has visited all nodes
 */
function isSubtree(root: TreeNode | null, subRoot: TreeNode | null): boolean {
  // Edge cases
  if (!root || !subRoot) return false;
  if (isSameTree(root, subRoot)) return true;
  return isSubtree(root.left, subRoot) || isSubtree(root.right, subRoot);
}

function isSameTree(tree1: TreeNode | null, tree2: TreeNode | null): boolean {
  if (!tree1 && !tree2) {
    return true;
  } else if (!tree1 || !tree2) {
    return false;
  }
  return tree1.val === tree2.val
    && isSameTree(tree1.left, tree2.left)
    && isSameTree(tree1.right, tree2.right);
}

expect(isSubtree(
  arrayToTree([3, 4, 5, 1, 2]),
  arrayToTree([4, 1, 2])
)).to.equal(true);
expect(isSubtree(
  arrayToTree([3, 4, 5, 1, 2, null, null, null, null, 0]),
  arrayToTree([4, 1, 2])
)).to.equal(false);
// Edge case
expect(isSubtree(
  arrayToTree([1, 1, 1, 30]),
  arrayToTree([30])
)).to.equal(true);
