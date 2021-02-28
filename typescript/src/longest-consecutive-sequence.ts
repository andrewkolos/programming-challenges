function longestConsecutive(nums: number[]): number {
  // Assuming no duplicates within nums.

  const set = new Set(nums);

  let best = 0;
  [...set].forEach(n => {
    let current = 1;
    let nextN = n - 1;
    while (set.has(nextN)) {
      set.delete(nextN);
      nextN -= 1;
      current += 1;
    }

    nextN = n + 1;
    while (set.has(nextN)) {
      set.delete(nextN);
      nextN += 1;
      current += 1;
    }

    best = Math.max(best, current);
  });
  return best;
};
