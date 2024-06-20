import { expect } from 'chai';
import { TreeNode, arrayToTree } from '../core/Tree.js';

const NULL_SYMBOL = 'x';

/**
 * 297. Serialize and Deserialize Binary Tree
 * Hard
 * Tree, BFS, Design
 * Time complexity: O(n), Space complexity: O(n)
 */
function serialize(root: TreeNode | null): string {
  if (!root) return NULL_SYMBOL;
  const result: string[] = [];
  const level: (TreeNode | null)[] = [root];
  while (level.length) {
    const node = level.shift();
    /*
      Null will be preserved, and represent as 'x'
                           a
      [a, null, c]  =>    / \
                         x   c
    */
    result.push(`${node?.val ?? NULL_SYMBOL}`);
    if (!node) continue;
    /*
      Should also push child of the leaf node as a placeholder.
      (like b node in the example below)
           a
          / \ 
         b   c      => [a, b, c, null, null, d]
        / \ / \
       x  x d  x
     */
    level.push(node.left);
    level.push(node.right);
  }
  // Remove trailing null values
  while (result[result.length - 1] === NULL_SYMBOL) {
    result.pop();
  }
  return result.join(',');
}

function deserialize(data: string): TreeNode | null {
  const input = data.split(',');
  // edge case
  if (input.length === 0 || input[0] === NULL_SYMBOL) return null;
  // +: Auto type cast to number
  const root = new TreeNode(+input.shift()!);
  let parentNodes = [root]
  while(parentNodes.length) {
    // Extract left and right child node
    let leftVal = input.shift() ?? null;
    let rightVal = input.shift() ?? null;
    const [left, right] = [leftVal, rightVal].map(val => {
      if (val === NULL_SYMBOL || val === null) {
        return null;
      }
      return new TreeNode(+val);
    });
    // Append child to parent
    const parent = parentNodes.shift()!;
    parent.left = left;
    parent.right = right;
    // Child to be a new parent
    if (left) parentNodes.push(left);
    if (right) parentNodes.push(right);
  }
  return root;
}

expect(serialize(arrayToTree([1, 2, 3]))).to.equal('1,2,3');
expect(serialize(arrayToTree([1, null, 2, 3]))).to.equal('1,x,2,3');
expect(deserialize('1,2,3')).to.deep.equal(arrayToTree([1, 2, 3]));
expect(deserialize('1,x,2,3')).to.deep.equal(arrayToTree([1, null, 2, 3]));
// Edge case
expect(serialize(null)).to.equal('x');
expect(deserialize('x')).to.equal(null);
