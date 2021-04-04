import { makeTestFunc } from './util/test';

let solution: number[] = [];

function sequentialDigits(low: number, high: number): number[] {
  solution = [];
  for (let i = 1; i <= 9; i++)
    helper(String(low), String(high), String(i));

  return solution.sort((a, b) => a-b);
};

function helper(low: string, high: string, current: string) {
  const asNum = Number(current);
  if (asNum >= Number(low) && asNum <= Number(high)) {
    solution.push(asNum);
  }

  if (current.length === high.length) {
    return;
  }

  const nextDigit = String(Number(getLastDigit(current)) + 1);
  if (Number(nextDigit) > 9) return;

  helper(low, high, current + nextDigit);
}

function getLastDigit(s: string) {
  if (s.length === 0) return -1;
  return s.charAt(s.length - 1);
}

const test = makeTestFunc(sequentialDigits);

test({
  input: [1000, 13000],
  output: [1234, 2345, 3456, 4567, 5678, 6789, 12345],
});
