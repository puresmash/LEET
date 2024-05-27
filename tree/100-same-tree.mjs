import { TreeNode, arrayToTree } from '../lib/treeUtils.mjs';

// const tree1 = arrayToTree([1,2,3]);
// const tree2 = arrayToTree([1,2,3]);
const tree1 = arrayToTree([1,null,3]);
const tree2 = arrayToTree([1,3,null]);

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/** 
 * DFS
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */
var isSameTree = function(p, q) {
  // TreeNode = null || undefined
  if (!p && !q) return true;
  const flag = p?.val === q?.val;
  // console.log(p?.val, q?.val, flag);
  return flag && isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
};

console.log(isSameTree(tree1, tree2));
