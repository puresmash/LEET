import { printTreeBFS, arrayToTree, TreeNode } from '../core/Tree.mjs';
/* 
111. Minimum Depth of Binary Tree 
worse case
  time: O(N) space: O(N)
best case
  time: O(N) space: O(logN) DFS 狀態 recursive stack 提前 resolve
*/

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
 * @return {number}
 */
var minDepth = function (root) {
  if (!root) return 0;
  return depth(root);

  /**
   * @param {TreeNode} root
   * @return {number}
   */
  function depth (root) {
    if (!root) return 0;
    const l = depth(root.left);
    const r = depth(root.right);
    /* e.g 兩邊長腳
    X = min(1, 2) + 1 = 2
      X
     / \
    1   2
       / \
      1   1
    */
    if (l && r) return Math.min(l, r) + 1;
    /* e.g 單邊長腳            或        本身為葉
    X = Max(0, 2) + 1 = 3          X = Max(0, 0) + 1 = 1
      X                              X
       \                            / \
        2
       /
      1 
    */
    else return Math.max(l, r) +1;
  }
};

// const tree = arrayToTree([3,9,20,null,null,15,7]);
const tree = arrayToTree([2,null,3,null,4,null,5,null,6]);
// const tree = arrayToTree([3,9,20,1,2,15,7]);
printTreeBFS(tree);
const output = minDepth(tree);
console.log(output);
