import { expect } from "chai";

/**
 * 684. Redundant Connection
 * Medium
 * Graph, Union Find
 * Time complexity: O(n), Space complexity: O(n)
 * where n is the number of vertices.
 * 
 * Thoughts:
 * Add a new edge in the already connected graph will cause a cycle.
 * => When adding an edge [v1, v2], if v1 and v2 are already in the same set,
 *    then that edge is redundant.
 * => Keep adding edges to the graph by union operation.
 *    Until the candidate v1, v2 have the same root, return them.
 */
function findRedundantConnection(edges: number[][]): number[] {
  // n vertices from 1 to n, n edges that form a graph with cycles.
  const parentAry = new Array(edges.length + 1)
    .fill(0)
    .map((_, index) => index);
  let result = [] as number[];
  edges.some(([v1, v2]) => {
    const isComplete = union(v1, v2);
    if (!isComplete) {
      result = [v1, v2];
      return true;
    }
  });
  return result;
  function find(vertex: number): number {
    while (parentAry[vertex] !== vertex) {
      // Keep checking the parent's parent until the root node.
      vertex = parentAry[vertex];
    }
    return vertex;
  }
  /**
   * @returns true if complete the union operation
   */
  function union(v1: number, v2: number): boolean {
    const root1 = find(v1);
    const root2 = find(v2);
    if (root1 === root2) {
      return false;
    } else {
      parentAry[root2] = root1;
      return true;
    }
  }
}

expect(
  findRedundantConnection([
    [1, 2],
    [1, 3],
    [2, 3],
  ])
).to.deep.equal([2, 3]);
expect(
  findRedundantConnection([
    [1, 2],
    [2, 3],
    [3, 4],
    [1, 4],
    [1, 5],
  ])
).to.deep.equal([1, 4]);
