// https://leetcode.com/discuss/interview-question/352743/Google-or-Onsite-or-Guaranteed-Binary-Search-Numbers

import { makeTestFunc } from './util/test';

// Binary search is a search algorithm usually used on a sorted sequence to quickly find an element with a given value.In this problem we will evaluate how binary search performs on data that isn't necessarily sorted. An element is said to be binary searchable if, regardless of how the pivot is chosen the algorithm returns true. For example:

// [2, 1, 3, 4, 6, 5] and target = 5, we cannot find 5. Because when the pivot is 4, we get element 6, then right pointer will move left, so we'll lose the opportunity to find target 5.
// [2, 1, 3, 4, 5, 6] and target = 5, we can find 5. Because wherever we choose the pivots, we'll find target at last.
// Given an unsorted array of n distinct integers, return the number of elements that are binary searchable.

function binarySearchableNumbers(numbers: number[]): number {
  const positionsOfNumbers = new Map<number, number>();
  const searchableNumbers = new Set(numbers); // We assume they are all searchable and then cross out unsearchables as we find them.

  numbers.forEach((n, i) => positionsOfNumbers.set(n, i));


  // 1. A number is unsearchable if a number less than it appears to its right.
  const allButLast = numbers.slice(0, numbers.length - 1);
  allButLast.forEach((n, i) => {
    const next = numbers[i + 1];
    if (next < n) searchableNumbers.delete(n);
    for (let ni = next + 1; ni < next; ni++) {
      searchableNumbers.delete(ni);
    }
  });

  // 2. A number is unsearchable if a number greater than it appears to its left.
  for (let i = numbers.length -1; i > 0; i--) { // all but first
    const n = numbers[i];
    const previous = numbers[i-1];

    if (previous > n) searchableNumbers.delete(n);
    for (let ni = n -1; ni > previous; ni--) {
      searchableNumbers.delete(ni);
    }
  }

  return searchableNumbers.size;
}

const test = makeTestFunc(binarySearchableNumbers);

test({
  input: [[1, 3, 2]],
  output: 1,
});

test({
  input: [[2, 1, 3, 5, 4, 6]],
  output: 2,
});

test({
  input: [[1, 5, 7, 11, 12, 18]],
  output: 6,
});

test({
  input: [[3, 2, 1]],
  output: 0,
});

test({
  input: [[5, 4, 6, 2, 8]],
  output: 1,
});

test({
  input: [[1, 3, 2, 4, 5, 7, 6, 8]],
  output: 4
});
