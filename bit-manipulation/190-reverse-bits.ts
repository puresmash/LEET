import { expect } from 'chai';

/**
 * 190. Reverse Bits
 * Easy
 * Bit Manipulation
 * Time complexity: O(1), Space complexity: O(1)
 * 
 * Thought:
 * The units digit should << 31, the tens digit should << 30, and so on.
 * The rest is how to make it happen, might have many ways.
 */
function reverseBits(n: number): number {
  let result = 0;
  for (let i = 0; i < 32; i++) {
    // Use `<<` to move and create space for the next bit
    result <<= 1;
    // Use `+` or `|` to add the last bit to the result
    result += (n & 0b1);
    // Get the next unprocessed bit
    n = n >> 1;
  }
  // The result should be an unsigned integer
  // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Unsigned_right_shift
  return result >>> 0;
}

expect(reverseBits(0b00000010100101000001111010011100)).to.equal(0b00111001011110000010100101000000);
// If the last bit is 1, will probably trigger a negative number
expect(reverseBits(0b11111111111111111111111111111101)).to.equal(0b10111111111111111111111111111111);
// Minus 1 to make the last bit becoming 0
expect(reverseBits(0b11111111111111111111111111111100)).to.equal(0b00111111111111111111111111111111);
