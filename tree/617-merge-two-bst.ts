import { TreeNode, arrayToTree, printTreeBFS } from '../lib/treeUtils.js';
/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */

function mergeTrees(root1: TreeNode | null, root2: TreeNode | null): TreeNode | null {
  if (!root1 && !root2) return null;
  if (!root1) return root2;
  if (!root2) return root1;
  const newNode = new TreeNode(root1.val + root2.val);
  newNode.left = mergeTrees(root1.left, root2.left);
  newNode.right = mergeTrees(root1.right, root2.right);
  return newNode;
};
const tree1 = arrayToTree([1,3,2,5]);
const tree2 = arrayToTree([2,1,3,null,4,null,7]);
const tree3 = mergeTrees(tree1, tree2);
console.log(printTreeBFS(tree3));
