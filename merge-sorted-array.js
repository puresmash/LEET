/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
 var merge = function(nums1, m, nums2, n) {
  // edge case: array1 or array2 is empty
  if (nums2.length === 0) return;
  const result = [];
  let x = 0;
  let y = 0;
  for (let i = 0; i < m + n; i++) {
      // y === n => exhaust y
      // x < m => make sure not contain tailing 0
      // e.g. [1, 2, 3, 0, 0, 0]; [2, 5, 6]
      if (y === n || (nums2[y] > nums1[x] && x < m)) {
          result.push(nums1[x]);
          x++;
      } else {
          result.push(nums2[y]);
          y++;
      }
  }
  // write back to meet the requirement
  result.forEach((ele, i) => {
      nums1[i] = result[i];
  })
};
