/**
 * 1. Sort and 左右逼近
 * 2. HashMap 存結果，相減取目標
 */
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
 var twoSum = function(nums, target) {
  // 若總和超過，動右邊以縮小
  // 若總和小於，動左邊以增加
  // 例外
  // 1. 元素可重複
  // 2. 元素可為負值
  let l = 0;
  let r = nums.length - 1;
  // sort
  const sorted = nums.map(ele => ele);
  sorted.sort((a, b) => a - b);
  // cal
  let result = [];
  while(true) {
   if (sorted[l] + sorted[r] > target) {
       r--;
   } else if (sorted[l] + sorted[r] < target) {
       l++;
   } else {
       result = [sorted[l], sorted[r]];
       break;
   }
  }
  // 找到原本的 index
  const leftIndex = nums.indexOf(result[0]);
  // 避免輸入值 [3, 3] 之類重複的狀況
  const rightIndex = nums.lastIndexOf(result[1]);
  return [leftIndex, rightIndex];
};

// console.log(twoSum([3,2,4], 6));
