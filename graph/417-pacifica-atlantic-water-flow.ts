import { expect } from 'chai';

/**
 * Medium
 * DFS, BFS, Graph
 * Have chose the DFS approach here.
 * Time complexity: O(n), Space complexity: O(n), where n is the total points of the grid.
 * 
 * Tip1: From seashore to the mountain will be much easier.
 * e.g.
 * If we choose the mountain point at (2, 1), it will flood to the point (2, 2) cause their height is the same -> 4.
 * But the undiscovered point for (2, 2) are all 5 (north is prohibited to prevent cycle),
 * then the dfs result will be connected=false, which is wrong.
 * To prevent this, we should have another mechanism to deal with the same height situation, which will be much more complex.
 * 若從點(2, 1)開始，往南邊的點(2, 2)走，點(2, 2)除回頭外的其他三方向都是更高的高地，
 * 以 DFS 的規則這裡會回傳“不連海”(實際上因為等高而有連)，若要排除這個例外，需要非常複雜的處理。
 * 若改由海邊往高處走，不會有這個問題，等高的位置會自然延伸進去。已知終點往起點走比較簡單。
 * 2 2 3 5
 * 2 3 4 5
 * 5 5 4 5
 * 7 1 5 5
 * 
 * Tip2: This example also demonstrates the way to use a Set data structure to record a Point. (`${x}, ${y}`)
 * We can use a Set to increase the readability instead of a 2D array.
 */
function pacificAtlantic(heights: number[][]): number[][] {
  const HEIGHT = heights.length;
  const WIDTH = heights[0].length;
  // `${x}, ${y}`
  const floodAtlantic = new Set<string>();
  const floodPacific = new Set<string>();
  // fixed y axis
  for (let x = 0; x < WIDTH; x++) {
    // y = 0, pacific
    dfs(x, 0, heights[0][x], floodPacific);
    // y = HEIGHT - 1, atlantic
    dfs(x, HEIGHT - 1, heights[HEIGHT - 1][x], floodAtlantic);
  }
  // fixed x axis
  for (let y = 0; y < HEIGHT; y++) {
    // x = 0, pacific
    dfs(0, y, heights[y][0], floodPacific);
    // x = WIDTH - 1, atlantic
    dfs(WIDTH - 1, y, heights[y][WIDTH - 1], floodAtlantic);
  }
  // Trace upstream
  function dfs(x: number, y: number, prevHeight: number, connected: Set<string>) {
    // Out of bound
    if (x < 0 || x >= WIDTH || y < 0 || y >= HEIGHT) return;
    // Visited
    if (connected.has(`${x}, ${y}`)) return;
    // Lower, not upstream
    if (heights[y][x] < prevHeight) return;
    // Mark as a valid visited first
    connected.add(`${x}, ${y}`);
    // Then keep searching for upstream from neighbors
    const currentHeight = heights[y][x];
    dfs(x, y - 1, currentHeight, connected);
    dfs(x + 1, y, currentHeight, connected);
    dfs(x, y + 1, currentHeight, connected);
    dfs(x - 1, y, currentHeight, connected);
  }
  // The question asks for the points that can reach both pacific and atlantic
  // Find the intersection of the two sets
  // The result should be in [y, x] format (because the natural of 2D array, but unintuitive for reading)
  const result: number[][] = [];
  for (let x = 0; x < WIDTH; x++) {
    for (let y = 0; y < HEIGHT; y++) {
      if (floodPacific.has(`${x}, ${y}`) && floodAtlantic.has(`${x}, ${y}`)) {
        result.push([y, x]);
      }
    }
  }
  return result;
}

// Add deep for 2D array comparison
expect(pacificAtlantic([
  [1, 2, 2, 3, 5],
  [3, 2, 3, 4, 4],
  [2, 4, 5, 3, 1],
  [6, 7, 1, 4, 5],
  [5, 1, 1, 2, 4]])).to.have.deep.members([[0, 4], [1, 3], [1, 4], [2, 2], [3, 0], [3, 1], [4, 0]]);
expect(pacificAtlantic([[1]])).to.have.deep.members([[0, 0]]);
expect(pacificAtlantic([[3,3,3],[3,1,3],[0,2,4]]))
  .to.have.deep.members([[0,0],[0,1],[0,2],[1,0],[1,2],[2,0],[2,1],[2,2]]);
