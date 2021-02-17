// https://leetcode.com/explore/challenge/card/january-leetcoding-challenge-2021/582/week-4-january-22nd-january-28th/3616/

import { makeTestFunc } from './util/test';

/**
 * Given an array nums of 0s and 1s and an integer k, return True if all 1's are at least k places away from each other, otherwise return False.
 */
function kLengthApart(nums: number[], k: number): boolean {
  const indexOfFirstOne = nums.indexOf(1);
  if (indexOfFirstOne == -1) return true;

  let kprime = k;
  for (let i = indexOfFirstOne + 1; i < nums.length; i++) {
    if (nums[i] === 1) {
      if (kprime > 0) {
        return false;
      }
      else {
        kprime = k;
      }
    } else {
      kprime--;
    }
  }

  return true;
};

const test = makeTestFunc(kLengthApart);

test({
  input: [[1, 0, 0, 1, 0, 1], 2],
  output: false,
});

test({
  input: [[1, 1, 1, 1, 1], 0],
  output: true,
});

test({
  input: [[0, 1, 0, 1], 2],
  output: false,
});
