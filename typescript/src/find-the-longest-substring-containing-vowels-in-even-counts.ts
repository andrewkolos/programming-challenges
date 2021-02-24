import { makeTestFunc } from './util/test';

function findTheLongestSubstring(s: string): number {
  let start = 0;
  let end = 0;
  let longest = 0;

  const map = {
    a: 0,
    e: 0,
    i: 0,
    o: 0,
    u: 0,
  };

  while (end < s.length) {
    if (map[s.charAt(end)] != null) map[s.charAt(end)]++;
    end++;

    const temp = { ...map };

    while (!Object.keys(temp).every(vowel => temp[vowel] % 2 == 0)) {
      if (temp[s.charAt(start)] != null) temp[s.charAt(start)]++;

      start++;
      if (end - start <= longest) break;
    }

    longest = Math.max(longest, end-start);
    start = 0;
  }

  return longest;
};

const test = makeTestFunc(findTheLongestSubstring);

test({
  input: ['leetcodeisgreat'],
  output: 5,
});

test({
  input: ['eleetminicoworoep'],
  output: 13
});

test({
  input: ['bcbcbc'],
  output: 6
});
