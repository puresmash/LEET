function solution(N) {
  let lmax = 0;
  let gmax = 0;
  let active = false;
  // edge case
  if (N < 5) return 0;
  while(N >= 1) {
    if(N % 2 === 1) {
      if (!active) {
        active = true;
        continue;
      }
      if (lmax > gmax) gmax = lmax;
      lmax = 0;
    } else {
      active && lmax++;
    }
    // console.log(N, lmax, gmax)
    // next
    N = N >> 1;
  }
  return gmax;
}

const input = 5;
console.log(input.toString(2));
const result = solution(input);
console.log(result);
