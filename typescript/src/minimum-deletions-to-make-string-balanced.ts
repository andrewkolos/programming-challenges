function minimumDeletions(s: string): number {
  // # unresolved a's and b's
  let as = 0;
  let bs = 0;
  let result = 0;

  for (let i = 0; i < s.length; i++) {
    const c = s.charAt(i);
    if (c === 'a') {
      if (bs !== 0) {
        as += 1;
      }
      if (as > bs) {
        result += bs;
        as = 0;
        bs = 0;
      }
    } else {
      bs++;
    }
  }

  result += as;

  return result;
}
