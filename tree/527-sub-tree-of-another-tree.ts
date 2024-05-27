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

function isSameTree(node: TreeNode | null, subNode: TreeNode | null): boolean {
  if (!node && !subNode) {
    return true;
  } else if (!node || !subNode) {
    return false;
  }
  return node.val === subNode.val
    && isSameTree(node.left, subNode.left)
    && isSameTree(node.right, subNode.right);
}

function isSubtree(root: TreeNode | null, subRoot: TreeNode | null): boolean {
  // edge cases
  if (!root || !subRoot) return false;
  if (isSameTree(root, subRoot)) return true;
  return isSubtree(root.left, subRoot) || isSubtree(root.right, subRoot);
};

// const tree = arrayToTree([3,4,5,1,2]);
// const subTree = arrayToTree([4,1,2]);
// const tree = arrayToTree([3,4,5,1,2,null,null,null,null,0]);
// const subTree = arrayToTree([4,1,2]);
const tree = arrayToTree([29, 28, 30, 27, 29, 29, 31, 26, 26, 28, 28, 28, 28, 30, 32, 25, 25, 25, 25, 27, 29, null, 29, 29, 29, null, 29, 29, 29, 31, null, 26, 24, 26, 26, 26, null, 24, null, null, 26, 28, null, 28, 28, 30, 28, 30, 30, null, null, 30, 30, 30, 30, null, 32, 27, 27, null, 25, 25, null, null, 25, 27, 27, null, null, null, null, 27, 27, 27, 29, null, null, null, 31, 29, null, 31, null, 29, 29, null, null, 29, 31, null, 29, 29, 31, null, 31, null, null, null, 28, 24, 24, 24, 26, 24, 24, null, 28, 26, 28, 26, null, null, null, 28, 28, null, 28, null, null, 28, 30, 32, null, 30, 28, 28, 28, null, null, null, null, 28, 30, 28, 28, null, null, null, null, 27, null, null, null, 23, 25, null, null, null, null, null, null, null, null, 27, 27, null, null, null, 29, null, null, null, null, 27, 29, null, 27, 27, null, null, null, null, 31, 29, 29, 27, 29, null, 29, 27, 29, null, null, null, null, 27, null, null, 29, null, null, 22, 22, null, 26, null, null, 26, 28, 28, 28, null, 28, null, 28, null, 28, null, null, null, null, null, null, null, 28, null, 28, 28, null, 30, null, null, null, null, null, 26, null, 28, 30, 21, 23, null, null, null, 25, null, 27, null, null, null, null, 27, 29, 27, 29, 27, 27, null, null, null, null, 29, null, 27, null, null, null, 25, 27, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 28, null, null, null, null, null, null, null, null, 26, null, null, 24, null, 28, null, null, null, null, null, 23]);
const subTree = arrayToTree([29]);
// printTreeBFS(tree);
console.log(isSubtree(tree, subTree));
