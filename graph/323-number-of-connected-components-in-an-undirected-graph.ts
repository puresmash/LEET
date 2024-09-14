import { expect } from 'chai';

/**
 * 323. Number of Connected Components in an Undirected Graph
 * Medium
 * Graph, Union Find (Can also be solved by DFS/BFS)
 * 
 * There are two solutions to this problem:
 * 1. DFS/BFS
 *    Time complexity: O(V + E), Space complexity: O(V)
 *    (Where V is the number of vertices and E is the number of edges.)
 *    a. Pick a node, find all the connected nodes, mark them as visited, then add count by 1.
 *    b. Among the remaining nodes, pick one and repeat the previous step.
 *    c. Repeat until all the nodes are visited.
 * 
 * 2. Union Find/Disjoint Set Union (DSU)
 *    Time complexity: O(n), Space complexity: O(n)
 *    There are two choices to implement the Union Find:
 *      a. Quick Find - which maintains a root array.
 *      b. Quick Union - which maintains a parent array.
 *    Both ways have the same time complexity, but the Quick Union is more efficient here.
 *    (No need to modify all the nodes in one of the connected components when union)
 *    Steps:
 *      a. Initialize the parent array.
 *      b. Count how many nodes' parents are themselves (it's root node).
 *      c. Return the count.
 * 
 * Notes:
 *   Despite the ways to display the time complexity here are different,
 *   the actual time complexity is similar.
 */
function countComponents(n: number, edges: number[][]): number {
  // Initialize the parent array, default parent is itself
  // [0, 1, 2, 3, 4, ...]
  const parentAry = new Array(n).fill(0).map((_, index) => index);
  // Union the connected vertices
  edges.forEach(([v1, v2]) => {
    union(v1, v2);
  });
  return parentAry.reduce((acc, parent, index) => {
    if (parent === index) acc++;
    return acc;
  }, 0);
  function find(vertex: number) {
    const parent = parentAry[vertex];
    if (parent === vertex) {
      return vertex;
    }
    return find(parent);
  }
  function union(v1: number, v2: number) {
    const root1 = find(v1);
    const root2 = find(v2);
    if (root1 !== root2) {
      parentAry[root2] = root1;
    }
  }
}

expect(countComponents(3, [[0, 1], [0, 2]])).to.equal(1);
expect(countComponents(6, [[0, 1], [1, 2], [2, 3], [4, 5]])).to.equal(2);
