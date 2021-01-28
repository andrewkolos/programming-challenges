import { makeTestFunc } from './util/test';


// https://leetcode.com/explore/challenge/card/january-leetcoding-challenge-2021/582/week-4-january-22nd-january-28th/3615/
// You are given an array of k linked-lists lists, each linked-list is sorted in ascending order.
// Merge all the linked - lists into one sorted linked - list and return it.

class ListNode {
  val: number
  next: ListNode | null
  constructor(val?: number, next?: ListNode | null) {
    this.val = (val===undefined ? 0 : val)
    this.next = (next===undefined ? null : next)
  }
}
// Alternative solution: merge lists two at a time.
function mergeKLists(lists: Array<ListNode | null>): ListNode | null {
  if (lists.length === 0) return null;

  const result = new ListNode(-1); // dummy node
  let curr = result;

  let indexOfLowestValue = -1;
  let lowestValue = Number.MAX_SAFE_INTEGER;

  while (true) {
    indexOfLowestValue = -1;
    lowestValue = Number.MAX_SAFE_INTEGER;
    lists.forEach((l, i) => {
      if (l == null) return;

      if (l.val < lowestValue) {
        lowestValue = l.val;
        indexOfLowestValue = i;
      }
    });

    if (indexOfLowestValue < 0) break;

    lists[indexOfLowestValue] = lists[indexOfLowestValue]!.next;
    curr.next = new ListNode(lowestValue);
    curr = curr.next;
  }


  return result.next; // remove dummy node
};


function makeList(...arr: number[]): ListNode | null {
  if (arr.length === 0) return null;
  const result = new ListNode(arr[0]);
  let curr = result;
  arr.slice(1).forEach(n => {
    curr.next = new ListNode(n);
    curr = curr.next;
  });
  return result;
}

const test = makeTestFunc(mergeKLists);

test({
  input: [[makeList(1, 4, 5), makeList(1, 3, 4), makeList(2, 6)]],
  output: makeList(1, 1, 2, 3, 4, 4, 5, 6)
});

test({
  input: [[]],
  output: makeList(),
});

test({
  input: [[makeList()]],
  output: makeList(),
});
