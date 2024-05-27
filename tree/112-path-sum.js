import { TreeNode, arrayToTree } from '../lib/treeUtils.mjs';

// const tree = arrayToTree([1, 2]);
const tree = arrayToTree([1, 2, 3]);

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} targetSum
 * @return {boolean}
 */
var hasPathSum = function (root, targetSum) {
  // empty tree
  if (!root) return false;
  return travel(root, 0, true);
  function travel(node, prevSum) {
    const sum = prevSum + node.val;
    // A leaf is a node with no children, so only check the sum when neither left nor right has a child.
    if (!node.left && !node.right && sum === targetSum) {
      return true;
    }
    return (!!node.left && travel(node.left, sum)) || (!!node.right && travel(node.right, sum));
  }
};

// console.log(hasPathSum(tree, 1));
console.log(hasPathSum(tree, 3));
