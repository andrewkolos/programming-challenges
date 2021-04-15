import { makeTestFunc } from './util/test';

function shortestCommonSupersequence(a: string, b: string): string {
  const lcs = longestCommonSubsequence(a, b);
  if (lcs.length === Math.max(a.length, b.length)) return lcs;

  let result = "";
  let aidx = 0;
  let bidx = 0;

  for (let i = 0; i < lcs.length; i++) {
    // Catch a up to the current character.
    while (aidx < a.length && a.charAt(aidx) != lcs.charAt(i)) {
      result = result + a.charAt(aidx);
      aidx += 1;
    }
    while (bidx < b.length && b.charAt(bidx) != lcs.charAt(i)) {
      result = result + b.charAt(bidx);
      bidx += 1;
    }
    result = result + lcs.charAt(i);
    aidx += 1;
    bidx += 1;
  }

  while (aidx < a.length) {
    result = result + a.charAt(aidx);
    aidx += 1;
  }

  while (bidx < b.length) {
    result = result + b.charAt(bidx);
    bidx += 1;
  }

  return result;
};

function longestCommonSubsequence(a: string, b: string): string {
  const memo: number[][] = [];

  for (let i = 0; i < a.length + 1; i++) {
    memo[i] = new Array(b.length + 1);
    memo[i][0] = 0; // Compare all a.sub(0, i) to "".
  }

  for (let j = 0; j < b.length + 1; j++) {
    memo[0][j] = 0;
  }

  for (let i = 1; i < a.length + 1; i++) {
    for (let j = 1; j < b.length + 1; j++) {
      if (a.charAt(i - 1) === b.charAt(j - 1)) {
        memo[i][j] = memo[i - 1][j - 1] + 1;
      } else {
        memo[i][j] = Math.max(memo[i - 1][j], memo[i][j - 1]);
      }
    }
  }

  let result = "";
  let i = a.length;
  let j = b.length;

  while (memo[i][j] !== 0) {
    if (memo[i][j] > memo[i - 1][j] && memo[i][j] > memo[i][j - 1]) {
      result = a.charAt(i - 1) + result;
      i -= 1;
      j -= 1;
    }
    else if (memo[i][j - 1] > memo[i - 1][j]) {
      j = j - 1
    } else {
      i = i - 1;
    }
  }

  return result;
}

const test = makeTestFunc(shortestCommonSupersequence);

test({
  input: ['abac', 'cab'],
  output: 'cabac'
});
