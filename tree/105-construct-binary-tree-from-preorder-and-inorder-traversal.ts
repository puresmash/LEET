import { expect } from 'chai';
import { TreeNode, arrayToTree } from '../core/Tree.js';

/**
 * 105. Construct Binary Tree from Preorder and Inorder Traversal
 * Medium
 * Tree, DFS
 * Time complexity: O(n), Space complexity: O(n)
 * https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/
 * 
 * Trick:
 * `preorder` to get the root node. But you don't know the size of either branch.
 * `inorder` to get the left branch (the left of the root) and right branch. So now you know the size of each branch.
 * 
 * Steps:
 * 1. The first element of the preorder array is the root node.
 * 2. Search the inorder array, the elements before the root node are the left branch.
 * 3. If left branch exists, the second element in the preorder array is the root node of the left subtree,
 *    also the elements before that root node in the inorder array are the left branch. 
 *    The same rule applies to the right branch. 
 * 4. Do step 3 recursively.
 */
function buildTree(preorder: number[], inorder: number[]): TreeNode | null {
  return buildSubtree(preorder, inorder);
}

function buildSubtree(preorder: number[], inorder: number[]): TreeNode | null {
  if (!preorder.length || !inorder.length) return null;
  const val = preorder.shift()!;
  const root = new TreeNode(val);
  const leftSubTree = inorder.splice(0, inorder.indexOf(val));
  root.left = buildSubtree(preorder, leftSubTree);
  const rightSubTree = inorder.splice(1);
  root.right = buildSubtree(preorder, rightSubTree);
  return root;
}

expect(buildTree([3, 9, 20, 15, 7], [9, 3, 15, 20, 7])).to.deep.equal(arrayToTree([3, 9, 20, null, null, 15, 7]));
expect(buildTree([-1], [-1])).to.deep.equal(arrayToTree([-1]));
