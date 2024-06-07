import { TreeNode, arrayToTree } from '../lib/treeUtils.js';

/**
 * backtracking method
 * time: O(n), space: O(H)
 * 
 * Not using the backtracking method is also OK, but the temporary space will be a little bit higher.
 */

function binaryTreePaths(root: TreeNode | null): string[] {
  const result = [] as string[];
  if (!root) return result;
  function dfs(node: TreeNode, tracking: number[]) {
    tracking.push(node.val);
    if (!node.left && !node.right) {
      result.push(tracking.join('->'));
    }
    if (node.left) dfs(node.left, tracking);
    if (node.right) dfs(node.right, tracking);
    tracking.pop();
  }
  dfs(root, []);
  return result;
};

const tree = arrayToTree([1,2,3,null,5]);
const paths = binaryTreePaths(tree);
console.log(paths);
