/**
 * --- O(n) | space: O(1) ---
 * 1. xor
 * 2. sum([1, 2, 3]) - sum([0, 1, 3])
 * --- O(nlogn)
 * sort and compare each elements
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
function missingNumber (nums) {
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

// O(nlogn)
// function missingNumber (nums) {
//   let result = nums.length;
//   nums = nums.sort((a, b) => a - b);
//   // nums.some((num, i) => {
//   //   if (i !== num) {
//   //     result = i;
//   //     return true;
//   //   }
//   // });
//   for (let i = 0; i < nums.length; i++) {
//     if (i !== nums[i]) {
//       result = i;
//       break;
//     }
//   }
//   return result;
// }

// console.log(missingNumber([0, 1]));
// console.log(missingNumber([0, 10, 20, 1]));
// console.log(missingNumber([3, 0, 1]));
