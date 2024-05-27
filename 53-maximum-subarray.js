/**
 * @param {number[]} nums
 * @return {number}
 */
 var maxSubArray = function(nums) {
  // 1 1 1 1 -5 1 1 1 1 1
  // not accept empty array
  let windowSum = nums[0];
  let gmax = nums[0];
  for (let i = 1; i < nums.length; i++) {
    // try to calculate local maximum
    let x = nums[i];
    let temp = windowSum + x;
    // if window + x < x, then window is useless
    if (temp < x) windowSum = x;
    else windowSum = temp;
    /*
     Lines 12-16 has a simpler format
     windowSum = Math.max(nums[i], windowSum + nums[i]);
     */
    // write down the global maximum
    gmax = Math.max(windowSum, gmax);
  }
  return gmax;
};

// Kadane's algorithm
console.log(maxSubArray([1, 1, 1, -3, 1, 1, 1, 1]));
