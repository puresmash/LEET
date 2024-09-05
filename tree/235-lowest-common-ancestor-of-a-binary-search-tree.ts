import { expect } from 'chai';
import { TreeNode, arrayToTree } from '../core/Tree.js';

/**
 * 235. Lowest Common Ancestor of a Binary Search Tree
 * Medium
 * Tree, DFS, Binary Search Tree
 * Time complexity: O(n), Space complexity: O(n) | Worst case
 * Time complexity: O(log(n)), Space complexity: O(log(n)) | Average case
 * 
 *      x
 *     / \
 *    y
 *   / \
 *  p   o
 *     / \
 *    q
 * 
 * Thought:
 * 1. Inspect the above BST, where y is the LCA of p and q.
 * 1-1. x is the common ancestor but not the LCA, then x is either greater than p, q OR smaller than p, q.
 *      The LCA y is in the left or right subtree of x.
 * 1-2. y is LCA, then y's value is between p and q.
 * 2. We can conclude a fact, keep traveling the BST until the first node, whose value is between p and q, is the LCA.
 */
function lowestCommonAncestor(root: TreeNode, p: TreeNode | null, q: TreeNode | null): TreeNode | null {
  const pVal = p!.val;
  const qVal = q!.val;
  return travel(root);
  function travel(node: TreeNode) {
    // The LCA is in the left subtree, keep searching left
    if (node.val > pVal && node.val > qVal) {
      return travel(node.left!);
    }
    // The LCA is in the right subtree, keep searching right
    else if (node.val < pVal && node.val < qVal) {
      return travel(node.right!);
    }
    // The first outcome between p and q, LCA found
    else {
      return node;
    }
  }
}

const tree1 = arrayToTree([6, 2, 8, 0, 4, 7, 9, null, null, 3, 5])!;
const result1 = lowestCommonAncestor(tree1, arrayToTree([2]), arrayToTree([8]));
expect(result1!.val).to.equal(6);
const tree2 = arrayToTree([2, 1])!;
const result2 = lowestCommonAncestor(tree2, arrayToTree([2]), arrayToTree([1]));
expect(result2!.val).to.equal(2);
