// Euclidean algorithm, Time complexity: O(log(min(a, b)))
export function findGCD (a: number, b: number): number {
  if (b > a) [a, b] = [b, a];
  // loop when remainder != 0
  while (b !== 0) {
    const remainder = a % b;
    [a, b] = [b, remainder];  
  }
  return a;
}

// Time complexity: O(log(min(a, b)))
export function findLCM (a: number, b: number): number {
  const gcd = findGCD(a, b);
  return a * b / gcd;
}

// Use to resolve the overflow issue in pow function: O(n)
function pow(base: number, exp: number, mod: number) {
  let result = 1;
  base %= mod;
  while (exp > 0) {
    result = Number((BigInt(result) * BigInt(base)) % BigInt(mod));
    exp--;
  }
  return result;
}
