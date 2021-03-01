function findLongestWord(s: string, d: string[]): string {
  d.sort();

  let bestSoFar = "";
  d.forEach(word => {
    if (isSubseq(s, word) && word.length > bestSoFar.length) {
      bestSoFar = word;
    }
  });
  return bestSoFar;
};

function isSubseq(s: string, candidate: string): boolean {
  let idxOfNextCharToSearch = 0;

  [...s].forEach(c => {
    if (c === candidate.charAt(idxOfNextCharToSearch)) {
      idxOfNextCharToSearch += 1;
    }
  });

  return idxOfNextCharToSearch === candidate.length;
}
