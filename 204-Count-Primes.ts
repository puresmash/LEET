import { expect } from 'chai';

/**
 * 204. Count Primes
 * Medium
 * Math, Sieve of Eratosthenes, Prime
 * 
 * Solution:
 * 1. Basic idea
 * Time complexity: O(n*sqrt(n)), Space complexity: O(1)
 *  => if n = 10^6 => 10^6 * 10^3 => 10^9 => 1sec ~ 10secs => TLE
 *  Steps:
 *    1. Test from 2 to n, check if it's a prime number.
 *    2. To check if a number x is a prime, divide x by 2 to sqrt(x).
 *       If any number from 2 to sqrt(x) can divide x, then x is not a prime.
 * 2. Sieve of Eratosthenes
 * Time complexity: O(n*log(log(n))), Space complexity: O(n)
 *  => On the base of the basic idea, we can also skip the multiples of a found 
 */
function countPrimes(n: number): number {
  const isPrimeAry = Array(n).fill(true);
  isPrimeAry[0] = false;
  isPrimeAry[1] = false;
  for (let i = 2; i < n; i++) {
    // skip the checked number
    if (!isPrimeAry[i]) continue;
    // from i^2, mark all the multiples as false
    for (let j = i * i; j < n; j += i) {
      isPrimeAry[j] = false;
    }
  }
  return isPrimeAry.filter(flag => flag).length;
}

// O(sqrt(n))
function isPrime(n: number): boolean {
  const end = Math.sqrt(n);
  for (let i = 2; i <= end; i++) {
    if (n % i === 0) return false;
  }
  return true;
}

// O(n * sqrt(n))
function basic(n: number): number {
  let count = 0;
  for(let i = 2; i < n; i++) {
    if(isPrime(i)) count++;
  }
  return count;
}

expect(countPrimes(10)).to.equal(4);
expect(countPrimes(0)).to.equal(0);
expect(countPrimes(1)).to.equal(0);
expect(countPrimes(2)).to.equal(0);
// TLE
expect(countPrimes(1000000)).to.equal(78498);
