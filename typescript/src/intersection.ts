import { makeTestFunc } from './util/test';

function intersect(nums1: number[], nums2: number[]): number[] {
  const freqCount1 = makeFreqCount(nums1);
  const freqCount2 = makeFreqCount(nums2);
  const allNums = new Set([...nums1, ...nums2]);

  const interCount = new Map<number, number>();

  allNums.forEach(n => {
    const count1 = freqCount1.get(n);
    const count2 = freqCount2.get(n);

    if (count1 && count2) {
      interCount.set(n, Math.min(count1, count2));
    }
  });

  console.log([...interCount.entries()]);

  return [...interCount.entries()]
    .map(entry => new Array(entry[1])
      .fill(0)
      .map(_ => entry[0]))
    .reduce(
      (acc, next) => acc.concat(next)
      , []);
};


function makeFreqCount(nums: number[]) {
  return nums.reduce(
    (res, c) => res.set(c, (res.has(c) ? res.get(c)! : 0) + 1),
    new Map<number, number>());
}

const test = makeTestFunc(intersect);

test({
  input: [[1, 2, 2, 1], [2, 2]],
  output: [2, 2]
});