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
export class TreeNode {
  public val: number;
  public left: TreeNode | null;
  public right: TreeNode | null;
  constructor(val?: TreeNode['val'], left?: TreeNode['left'], right?: TreeNode['right']) {
    this.val = (val === undefined ? 0 : val)
    this.left = (left === undefined ? null : left)
    this.right = (right === undefined ? null : right)
  }
  toString() {
    return this.val || 'N';
  }
}

/**
* Why not recursive? Cause the input array is in BFS format naturally
* Input example: [x, null, null, y, z]
* @param {[number]} input
* @returns {TreeNode}
*/
export function arrayToTree(input: (number | null)[]) {
  if (!input.length) return null;
  // clone
  const inputAry = input.slice(0);
  // root
  const rootVal = inputAry.shift()!;
  const rootNode = new TreeNode(rootVal, null, null);
  const parentNodes = [rootNode];
  while (parentNodes.length) {
    const left = inputAry.shift() ?? null;
    const right = inputAry.shift() ?? null;
    const leftNode = left === null ? null : new TreeNode(left!, null, null);
    const rightNode = right === null ? null : new TreeNode(right!, null, null);
    // Append new nodes to the parent
    const parent = parentNodes.shift()!;
    parent.left = leftNode;
    parent.right = rightNode;
    // Add valid new nodes to the parentNodes
    leftNode && parentNodes.push(leftNode);
    rightNode && parentNodes.push(rightNode);
  }
  return rootNode;
}

/**
 *   a
 *  / \  => [a, b, c]
 * b   c
 */
export function treeToArray(tree: TreeNode | null | undefined) {
  if (!tree) return [];
  const result: (number | null)[] = [];
  const level: (TreeNode | null)[] = [tree];
  while (level.length) {
    const node = level.shift();
    // There is a chance need to push null value
    //    a
    //   / \ => [a, null, c]
    // null c
    result.push(node?.val ?? null);
    if (!node) continue;
    /*
      Should also push child of the leaf node.
      e.g. b is a leaf node, should keep its child as a placeholder
           a
          / \ 
         b   c      => [a, b, c, null, null, d]
        / \ / \
       n  n d  n
     */
    level.push(node.left);
    level.push(node.right);
  }
  // Remove trailing null values
  while (result[result.length - 1] === null) {
    result.pop();
  }
  return result;
}

/* 
x
/ \
y y
/ \/ \
z z z z
*/
export function printTreeBFS(tree: TreeNode | null | undefined) {
  if (!tree) return;
  const level = [tree];
  console.log(tree.val);
  printLevel(level);
  // TODO cleanup
  function printLevel(level: TreeNode[]) {
    if (level.length === 0) return;
    const [legs, nodes, nextLevel] = level.reduce<[string[], (string | number)[], TreeNode[]]>(([legs, nodes, nextLevel], ele) => {
      if (ele.left && ele.left.val) {
        legs.push('/');
        nodes.push(ele.left.val);
        nextLevel.push(ele.left);
      } else if (!ele.left) {
        legs.push('x');
        nodes.push(' ');
      }
      if (ele.right && ele.right.val) {
        legs.push('\\');
        nodes.push(ele.right.val);
        nextLevel.push(ele.right);
      } else if (!ele.right) {
        legs.push('x');
        nodes.push(' ');
      }
      return [legs, nodes, nextLevel];
    }, [[], [], []]);
    // Print Legs, Nodes
    console.log(legs.join(' '));
    console.log(nodes.join(' '));
    // Next
    printLevel(nextLevel);
  }
}
