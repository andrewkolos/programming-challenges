import { makeTestFunc } from './util/test';

function minFlipsMonoIncr(S: string): number {
  let oneCount = 0;
  let flipCount = 0;

  [...S].forEach(c => {
    if (c === '0' && oneCount > 0) {
      flipCount += 1;
    }

    if (c === '1') {
      oneCount += 1;
    }

    flipCount = Math.min(oneCount, flipCount);
  });

  return flipCount;
};

const test = makeTestFunc(minFlipsMonoIncr);

test({
  input: ['00110'],
  output: 1,
});

test({
  input: ['010110'],
  output: 2,
});

test({
  input: ['00011000'],
  output: 2,
});
