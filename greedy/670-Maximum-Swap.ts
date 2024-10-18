import { expect } from 'chai';

/**
 * 670. Maximum Swap
 * Medium
 * Greedy
 * Time complexity: O(n), Space complexity: O(1)
 * 
 * Strategy
 * 1. Simpler but takes O(n^2) time complexity:
 * Traverse the number from left to right,
 * for each digit, if it is smaller than any digit after it, add it as a candidate for swapping.
 * Then find the largest digit after it (from right to left), swap them.
 * e.g. 1993, take the rightmost 9 would be better, cause:
 * Take the first 9 -> 9193
 * Take the second 9 -> 9913
 * 
 * 2. T: O(n), S: O(1)
 * Hint: Don't worry the extra space nor time, since there are only 10 digits `O(1)`.
 * 0. Count the occurrence of each digit.
 * 1. Find the left candidate
 *    Traverse from left to right, decrease the count of the current digit.
 *    If there are any digit larger than the current digit, add the current digit as a candidate.
 *    At the same time, save the largest available digit x.
 *    When the traversal ends, if there isn't any candidate, return the original number.
 * 2. Find the right candidate
 *    Traverse from right to left, until reaching any digit equal to x, add it as a candidate.
 */
function maximumSwap(num: number): number {
  const occurrence: number[] = new Array(10).fill(0);
  const digitAry = num.toString().split('');
  // Count occurrence O(n)
  for (let i = 0; i < digitAry.length; i++) {
    const current = parseInt(digitAry[i]);
    occurrence[current]++;
  }
  // Find the left candidate, and the value of the right candidate O(n)
  let leftIndex = -1;
  let rightValue = -1;
  for (let i = 0; i < digitAry.length && leftIndex === -1; i++) {
    const current = parseInt(digitAry[i]);
    occurrence[current]--;
    for (let j = 9; j > current; j--) {
      if (occurrence[j] > 0) {
        leftIndex = i;
        rightValue = j;
        break;
      }
    }
  }
  // If no left candidate, return the original number
  if (leftIndex === -1) return num;
  // Find the right candidate O(n)
  // If the code reaches here, there must be a right candidate
  let rightIndex = -1;
  for (let i = digitAry.length - 1; i > leftIndex; i--) {
    const current = parseInt(digitAry[i]);
    if (current === rightValue) {
      rightIndex = i;
      break;
    }
  }
  // Swap the left and right candidates
  [digitAry[leftIndex], digitAry[rightIndex]] = [digitAry[rightIndex], digitAry[leftIndex]];
  return parseInt(digitAry.join(''));
}

expect(maximumSwap(2736)).to.equal(7236);
expect(maximumSwap(9973)).to.equal(9973);
expect(maximumSwap(12)).to.equal(21);
expect(maximumSwap(98368)).to.equal(98863);
expect(maximumSwap(1993)).to.equal(9913);
