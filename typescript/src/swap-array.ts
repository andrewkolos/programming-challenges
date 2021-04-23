/**
 Do not return anything, modify nums in-place instead.
 */
function rotate(nums: number[], k: number): void {
  let swapsMade = 0;
  for (let i = 0; swapsMade < nums.length; i++) {
    let start = i;
    let current = i;
    let temp = nums[start];
    do {
      const nextInd = (current + k) % nums.length;
      const nextTemp = nums[nextInd];

      nums[nextInd] = temp;

      temp = nextTemp;
      current = nextInd;
      swapsMade++;

    } while (current != start);
  }
};