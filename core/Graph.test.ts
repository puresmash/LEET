import { adjacencyListToGraph, graphToAdjacencyList} from './Graph';

describe('Connected Undirected Graph', () => {
  // Because we cannot draw a graph in the console, can only examine the transformation function back and forth
  test('The transforming functions are counted working if back and forth remain the same', () => {
    const adjList = [[2,4],[1,3],[2,4],[1,3]];
    const node = adjacencyListToGraph(adjList);
    expect(graphToAdjacencyList(node)).toEqual(adjList);
  });
  test('Function graph to adjList should return [] when receiving null', () => {
    expect(graphToAdjacencyList(null)).toEqual([]);
  })
});
