import { expect } from 'chai';
import { _Node, adjacencyListToGraph, graphToAdjacencyList } from '../core/Graph.js';

/**
 * Medium
 * DFS, BFS, Graph
 * Time complexity: O(V + E), Space complexity: O(V)
 * A graph naturally has cycles, so we need to keep track of the visited nodes to end recursion.
 */
function cloneGraph(node: _Node | null): _Node | null {
  if (!node) return null;
  const old2New = new Map<_Node, _Node>();
  const newGraph = dfs(node);
  function dfs(oldNode: _Node): _Node {
    if (old2New.has(oldNode)) return old2New.get(oldNode)!;
    const newNode = new _Node(oldNode.val, []);
    old2New.set(oldNode, newNode);
    oldNode.neighbors.forEach(neighbor => {
      newNode.neighbors.push(dfs(neighbor));
    });
    return newNode;
  }
  return newGraph;
}

const adjList = [[2,4],[1,3],[2,4],[1,3]];
const graph = adjacencyListToGraph(adjList);
expect(graphToAdjacencyList(cloneGraph(graph))).to.deep.equal(adjList);
