import { expect } from 'chai';

/**
 * Medium
 * DFS, BFS, Graph
 * Time complexity: O(n), n is the total points in the grid
 * Space complexity: O(1) <- in-place
 * Like a painter app, when we fill an area, we fill the point we clicked and its neighbors with the same color.
 * Do this recursively until we fill all the connected points with the same original color.
 * 
 * In this case, when we hit a land through iteration, we
 * 1. Flood it and its neighbors with water.
 * 2. Add count by 1.
 * 3. Continue the iteration with the flooded grid.
 */
function numIslands(grid: string[][]): number {
  const height = grid.length;
  const width = grid[0].length;
  let count = 0;
  // For each '1' cell, flood it and its neighbors, then add count by 1
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (grid[y][x] === '1') {
        floodIsland(y, x);
        count++;
      }
    }
  }
  // DFS
  function floodIsland(y: number, x: number) {
    // grid out of bound
    if (y < 0 || y >= height || x < 0 || x >= width) return;
    // not an island
    else if (grid[y][x] === '0') return;
    // flood this land with water
    grid[y][x] = '0';
    floodIsland(y - 1, x);
    floodIsland(y, x + 1);
    floodIsland(y + 1, x);
    floodIsland(y, x - 1);
  }
  return count;
}

expect(numIslands([
  ["1","1","1","1","0"],
  ["1","1","0","1","0"],
  ["1","1","0","0","0"],
  ["0","0","0","0","0"]
])).to.equal(1);

expect(numIslands([
  ["1","1","0","0","0"],
  ["1","1","0","0","0"],
  ["0","0","1","0","0"],
  ["0","0","0","1","1"]
])).to.equal(3);
