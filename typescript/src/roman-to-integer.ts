const romanInfo = new Map([
  ['I', 1],
  ['V', 5],
  ['X', 10],
  ['L', 50],
  ['C', 100],
  ['D', 500],
  ['M', 1000],
]);

function romanToInt(s: string): number {
  let result = 0;

  let i = 0;
  while (i < s.length - 1) {
    const current = romanInfo.get(s.charAt(i));
    const next = romanInfo.get(s.charAt(i + 1));

    if (next > current) {
      result += next - current;
      i += 2;
    } else {
      result += current;
      i += 1;
    }
  }

  if (i === s.length - 1) result += romanInfo.get(s.charAt(i));

  return result;
};
