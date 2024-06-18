import { TreeNode, arrayToTree } from '../core/Tree.mjs';

/**
 * 543. Diameter of Binary Tree
 * Time: O(N), Space: O(1)
 */
var diameterOfBinaryTree = function (root) {
  let max = 0;
  /**
   * @param {TreeNode} node 
   * @returns {number} maxDepth
   */
  function dfs(node) {
    if (!node) return 0;
    const lMaxDepth = dfs(node.left);
    const rMaxDepth = dfs(node.right);
    // leaf node
    if (!node.left && !node.right) return 0;
    /*       OR
         o        o
          \      /
           o    o
    */
    else if (!node.left || !node.right) {
      max = Math.max(max, rMaxDepth + lMaxDepth + 1);
      return rMaxDepth + lMaxDepth + 1;
    }
    /*       
         o  
        / \
       o   o
    */
    max = Math.max(max, rMaxDepth + lMaxDepth + 2);
    return rMaxDepth >= lMaxDepth ? rMaxDepth + 1 : lMaxDepth + 1;
  }
  dfs(root);
  return max;
};

// const tree = arrayToTree([1, 2, 3]); // 2
// const tree = arrayToTree([1, 2, null]); // 1
// const tree = arrayToTree([1, 2, 3, 4, 5, null, null]); // 3
const tree = arrayToTree([1, 2, 3, 4, 5, 6, 7]); // 4

// longest path not passed root node
// const tree = arrayToTree([4,-7,-3,null,null,-9,-3,9,-7,-4,null,6,null,-6,-6,null,null,0,6,5,null,9,null,null,-1,-4,null,null,null,-2]); // 8
console.log(diameterOfBinaryTree(tree));
