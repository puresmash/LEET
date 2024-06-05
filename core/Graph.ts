// Node of a connected undirected graph
export class _Node {
  val: number
  neighbors: _Node[]
  constructor(val?: number, neighbors?: _Node[]) {
    this.val = (val === undefined ? 0 : val)
    this.neighbors = (neighbors === undefined ? [] : neighbors)
  }
  appendNeighbor(node: _Node) {
    this.neighbors.push(node);
  }
  setNeighbors(neighbors: _Node[]) {
    this.neighbors = neighbors;
  }
}

/**
 * Helper function to convert adjacency list to connected undirected graph
 * @param adjList 1-indexed adjacency list
 * @returns graph represented by first node
 */
export function adjacencyListToGraph(adjList: number[][]): _Node {
  const nodeMap = new Map<number, _Node>();
  function dfs(val: number, neighbors: number[]): _Node {
    const node = new _Node(val);
    nodeMap.set(val, node);
    const neighborNodes = neighbors.map(neighbor => {
      if (nodeMap.has(neighbor)) {
        return nodeMap.get(neighbor)!;
      }
      return dfs(neighbor, adjList[neighbor - 1]);
    });
    node.setNeighbors(neighborNodes);
    return node;
  }
  // 1-indexed
  return dfs(1, adjList[0]);
}

/**
 * BFS |
 * Can hardly represent the graph by console, this usually helps to debug
 */
export function graphToAdjacencyList(node: _Node | null): number[][] {
  if (!node) return [];
  const nodeMap = new Map<number, number[]>();
  nodeMap.set(node.val, node.neighbors.map(node => node.val));
  const queue: _Node[] = node.neighbors;
  while (queue.length) {
    const node = queue.shift()!;
    if (nodeMap.has(node.val)) continue;
    nodeMap.set(node.val, node.neighbors.map(node => node.val));
    node.neighbors.forEach(neighbor => {
      if (!nodeMap.has(neighbor.val)) {
        queue.push(neighbor);
      }
    });
  }
  const result: number[][] = [];
  // 1-indexed
  for (let i = 1; i <= nodeMap.size; i++) {
    // if lacking any of value, we cannot represent the graph using a index-based array
    result.push(nodeMap.get(i)!);
  }
  return result;
}
