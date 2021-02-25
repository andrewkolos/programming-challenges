function freqAlphabets(s: string): string {
  let result = "";
  let i = s.length - 1;
  while (i >= 0) {
    if (s.charAt(i) === "#") {
      result = result + parseJtoZ(s.substring(i - 2, i));
      i -= 3;
    } else {
      result = result + parseAtoI(s.charAt(i));
      i -= 1;
    }
  }
  return [...result].reverse().join('');
};

function parseAtoI(c: string): string {
  const charCodeA = 'a'.charCodeAt(0);
  const cNum = Number(c);

  return String.fromCharCode(charCodeA + cNum - 1);
}

function parseJtoZ(s: string): string {
  const charCodeJ = 'j'.charCodeAt(0);
  const sNum = Number(s);

  return String.fromCharCode(charCodeJ + sNum - 10);
}
