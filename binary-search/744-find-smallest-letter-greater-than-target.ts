import { expect } from 'chai';

function nextGreatestLetter(letters: string[], target: string): string {
    // a -> 97, z -> 122
    // let targetIndex: number;
    // const targetCode = target.charCodeAt(0);
    let l = 0, r = letters.length - 1;
    while(l < r) {
      const m = Math.floor((r + l) /2);
      if (letters[m].charCodeAt(0) > target.charCodeAt(0)) {
        r = m;
      } else {
        l = m + 1;
      }
    }
    return letters[l].charCodeAt(0) > target.charCodeAt(0) ? letters[l] : letters[0];
}

expect(nextGreatestLetter(['c', 'f', 'j'], 'a')).to.equal('c');
