/**
 * USE INDEX TO SAVE SPACE
 * In order to save the space complexity,
 * we use index and the input array to save result.
 * When ever a value if check, we mark the corresponding index as negative.
 */
/**
 * @param {number[]} nums
 * @return {number[]}
 */
const findDisappearedNumbers = function(nums) {
  nums.forEach((v, i) => {
    // find index
    const targetIndex = Math.abs(v) - 1;
    // mark negative
    nums[targetIndex] = -Math.abs(nums[targetIndex]);
  });
  const result = [];
  // find all non-negative index
  nums.forEach((v, i) => {
    if (v > 0) result.push(i + 1);
  });
  return result;
};

console.log(findDisappearedNumbers([1, 4, 4, 4]));
console.log(findDisappearedNumbers([4, 3, 2, 3]));
