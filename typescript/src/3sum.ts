import { makeTestFunc } from './util/test';

function threeSum(nums: number[]): number[][] {
  nums.sort();
  const solutions: number[][] = [];

  for (let i = 0; i < nums.length - 2; i++) {
    const currentTarget = - nums[i];
    const seenNumbers = new Set<number>();
    if (i > 0 && nums[i] === nums[i - 1]) continue;

    for (let j = i + 1; j < nums.length; j++) {
      if (seenNumbers.has(currentTarget - nums[j])) {
        solutions.push([nums[i], nums[j], currentTarget - nums[j]]);
        while (j + 1 < nums.length && nums[j] === nums[j + 1]) j++;
      }
      seenNumbers.add(nums[j]);
    }
  }

  return solutions;
}

const test = makeTestFunc(threeSum);

test({
  input: [[-1, 0, 1, 2, -1, -4]],
  output: [[-1, -1, 2], [-1, 0, 1]],
});

test({
  input: [[0, 0, 0, 0]],
  output: [[0, 0, 0]],
});
