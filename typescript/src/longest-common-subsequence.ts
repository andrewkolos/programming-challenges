import { makeTestFunc } from './util/test';

function longestCommonSubsequence(a: string, b: string): string {
  const memo: number[][] = [];

  for (let i = 0; i < a.length + 1; i++) {
    memo[i] = new Array(b.length+1);
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
      result = a.charAt(i-1) + result;
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

const test = makeTestFunc(longestCommonSubsequence);

test({
  input: ['abcdgh', 'aedfhr'],
  output: 'adh',
});

test({
  input: ['aggtab', 'gxtxayb'],
  output: 'gtab',
});

test({
  input: ['abcde', 'ace'],
  output: 'ace',
});

test({
  input: ['abc', 'abc'],
  output: 'abc',
});

test({
  input: ['abc', 'def'],
  output: '',
});

test({
  input: ['abac', 'cab'],
  output: 'ab',
});

test({
  input: ["aabbabaa", "aabbbbbbaa"],
  output: 'aabbbaa',
});
