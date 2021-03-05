// https://leetcode.com/explore/challenge/card/january-leetcoding-challenge-2021/583/week-5-january-29th-january-31st/3622/

// You are given an array nums of n positive integers.

// You can perform two types of operations on any element of the array any number of times:

// If the element is even, divide it by 2.
// For example, if the array is[1, 2, 3, 4], then you can do this operation on the last element, and the array will be[1, 2, 3, 2].
// If the element is odd, multiply it by 2.
// For example, if the array is[1, 2, 3, 4], then you can do this operation on the first element, and the array will be[2, 2, 3, 4].
// The deviation of the array is the maximum difference between any two elements in the array.

// Return the minimum deviation the array can have after performing some number of operations.

function minimumDeviation(nums: number[]): number {
  if (nums.length === 0) return 0;

  const oddsRemoved = nums.map(n => n % 2 === 1 ? n * 2 : n);
  let min = oddsRemoved.reduce((prev, curr) => Math.min(prev, curr), oddsRemoved[0]);
  const maxPq = new PriorityQueue<number>((a, b) => a -b);
  oddsRemoved.forEach(n => maxPq.insert(n));
  let minDeviation = maxPq.peek()! - min;

  while (!maxPq.isEmpty() && maxPq.peek()! % 2 == 0) {
    const largest = maxPq.poll()! / 2;
    maxPq.insert(largest);
    min = Math.min(min, largest);
    minDeviation = Math.min(minDeviation, maxPq.peek()! - min);
  }

  return minDeviation;
};


class PriorityQueue<T> {

  private readonly data: T[] = [];
  private readonly comparator: (a: T, o: T) => number;

  public constructor(comparator?: (a: T, o: T) => number) {
    this.comparator = comparator ? comparator :
      (a: T, o: T) => {
        const typeOfA = typeof a;
        const typeOfO = typeof o;

        if (typeOfA !== typeOfO) {
          throw Error(`Could not compare values of differing types: '${typeOfA}' and '${typeOfO}'.`);
        }

        if (typeof a === 'number' && typeof o === 'number') return a - o;
        if (typeof a === 'string' && typeof o === 'string') return a.localeCompare(o);

        throw Error(`Unable to compare values of type ${typeOfA}. No comparator was provided.`);
      };
  }

  public insert(item: T): void {
    this.data.push(item);
    this.bubbleUp(this.data.length - 1);
  }

  public peek(): T | undefined {
    return this.data[0];
  }

  public poll(): T | undefined {
    const result = this.data[0];
    const end = this.data.pop();
    if (end == null) return end;

    if (this.data.length > 0) {
      this.data[0] = end;
      this.sinkDown(0);
    }

    return result;
  }

  public isEmpty(): boolean {
    return this.data.length === 0;
  }

  private bubbleUp(index: number): void {
    if (index === 0) return;

    const c = this.indexComparator;

    const parentIndex = Math.floor(index / 2);
    if (c(parentIndex, index) < 0) {
      const current = this.data[index];
      this.data[index] = this.data[parentIndex];
      this.data[parentIndex] = current;
      this.bubbleUp(parentIndex);
    }
  }

  private sinkDown(index: number): void {
    const c = this.indexComparator;

    const leftIdx = index * 2;
    const rightIdx = index * 2 + 1;

    let idxOfLeastChildLessThanCurrent: number | null = null;

    if (leftIdx < this.data.length && c(index, leftIdx) < 0) {
      idxOfLeastChildLessThanCurrent = leftIdx;
    }

    if (rightIdx < this.data.length && c(index, rightIdx) < 0) {
      idxOfLeastChildLessThanCurrent = leftIdx < this.data.length && c(leftIdx, rightIdx) < 0 ?
        rightIdx : leftIdx;
    }

    if (idxOfLeastChildLessThanCurrent == null) return;

    const current = this.data[index];
    this.data[index] = this.data[idxOfLeastChildLessThanCurrent];
    this.data[idxOfLeastChildLessThanCurrent] = current;

    this.sinkDown(idxOfLeastChildLessThanCurrent);
  }

  private indexComparator = (i: number, o: number) => {
    return this.comparator(this.data[i], this.data[o]);
  }
}
