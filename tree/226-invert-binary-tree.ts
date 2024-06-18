import { TreeNode, arrayToTree, printTreeBFS } from '../core/Tree.js';

function invertTree(root: TreeNode | null): TreeNode | null {
  function dst(node: TreeNode) {
    if (!node.left && !node.right) return;
    const left = node.left;
    node.left = node.right;
    node.right = left;
    if (node.left) dst(node.left);
    if (node.right) dst(node.right);
  }
  if (root) dst(root);
  return root;
};

const tree = arrayToTree([4,2,7,1,3,6,9]);
printTreeBFS(invertTree(tree));
