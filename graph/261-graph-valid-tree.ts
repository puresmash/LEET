import { expect } from 'chai';

/**
 * 261. Graph Valid Tree
 * Medium
 * Graph, DFS, BFS
 * Time complexity: O(V + E), Space complexity: O(V)
 * where V is the number of vertices and E is the number of edges.
 * 
 * A valid tree:
 * 1. No isolated nodes
 *    => Start from any node, all the nodes can be visited.
 * 2. No cycles
 *    => If a graph with n vertices is a tree, then it must have n - 1 edges.
 *    => To build a cycle, we need to add at least one more edge to the graph.
 *    e.g. 0  →  2
 *          ↘ 1 ↗
 *    3 vertices, 3 edges, [0, 2] is redundant and been used to build a cycle. 
 * 
 * Notes:
 * - Can also be solved by Union Find
 */
function validTree(n: number, edges: number[][]): boolean {
  // Edge case: n = 1, no edges
  if (edges.length === 0) return n === 1;
  // Undirected graph
  // [[0, 1], [0, 2], [1, 2]] => { 0: [1, 2], 1: [0, 2], 2: [0, 1] }
  const graph: Record<number, number[]> = {};
  // Construct the undirected graph
  edges.forEach(([v1, v2]) => {
    if (!graph[v1]) graph[v1] = [];
    if (!graph[v2]) graph[v2] = [];
    graph[v1].push(v2);
    graph[v2].push(v1);
  });
  const visited = new Set<number>();
  dfs(edges[0][0]);
  // DFS traversal
  function dfs(node: number) {
    visited.add(node);
    const neighbors = graph[node];
    neighbors.forEach(node => {
      if (visited.has(node)) return
      dfs(node);
    });
  }
  // Has isolated nodes if any node is not visited
  if (visited.size !== n) return false;
  // Has cycles if the number of edges is not n - 1
  if (edges.length !== n - 1) return false;
  return true;
}

expect(validTree(5, [[0, 1], [0, 2], [0, 3], [1, 4]])).to.be.true;
expect(validTree(5, [[0, 1], [1, 2], [2, 3], [1, 3], [1, 4]])).to.be.false;
