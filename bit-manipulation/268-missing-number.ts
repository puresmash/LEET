import { expect } from 'chai';

/**
 * 268. Missing Number
 * Easy
 * Bit manipulation
 * 
 * 1. XOR
 * Time complexity: O(n), Space complexity: O(1)
 * 
 * 3 -> 011
 * XOR
 * 3 -> 011
 * will be 0
 * 
 * 2. Sort and compare each element
 * Time complexity: O(nlogn), Space complexity: O(1)
 */
function missingNumber(nums: number[]): number {
  // Provide an extra value N (missingNumber([0, 1]) -> 2)
  let result = nums.length;
  for (let i = 0; i < nums.length; i++) {
    // iterate 1 ~ N
    result ^= i;
    // iterate all array elements
    result ^= nums[i];
  }
  // according to the nature of XOR, we can get the missing one
  return result;
}

expect(missingNumber([3, 0, 1])).to.equal(2);
expect(missingNumber([0, 1])).to.equal(2);
expect(missingNumber([9, 6, 4, 2, 3, 5, 7, 0, 1])).to.equal(8);

// // O(nlogn)
// function missingNumber (nums: number[]): number {
//   let result = nums.length;
//   nums = nums.sort((a, b) => a - b);
//   // Index doesn't match the value
//   for (let i = 0; i < nums.length; i++) {
//     if (i !== nums[i]) {
//       result = i;
//       break;
//     }
//   }
//   return result;
// }
