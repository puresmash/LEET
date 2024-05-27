/*
  Use XOR
  Time complexity: O(n)
 */

function singleNumber(nums: number[]): number {
  return nums.reduce((acc, v) => {
    return acc ^ v;
  }, 0);
};

console.log(singleNumber([4, 1, 2, 1, 2]));
