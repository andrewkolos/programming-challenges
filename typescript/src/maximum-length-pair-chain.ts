import { makeTestFunc } from './util/test';

function findLongestChain(pairs: number[][]): number {
  pairs.sort((a, b) => a[1] - b[1]);

  let result = 0;
  let minCValue = - Number.MAX_VALUE;

  for (let i = 0; i < pairs.length; i++) {
    const current = pairs[i];

    if (current[0] > minCValue) {
      result += 1;
      minCValue = current[1];
    }
  }

  return result;
};

const test = makeTestFunc(findLongestChain);

test({
  input: [[[1,2], [2, 3], [3, 4]]],
  output: 2,
});

test({
  input: [[[-10, -8], [8, 9], [-5, 0], [6, 10], [-6, -4], [1, 7], [9, 10], [-4, 7]]],
  output: 4,
});
