function trapRainWater(heightMap: number[][]): number {
  const m = heightMap.length;
  if (m === 0) return 0;
  const n = heightMap[0].length;
  if (n === 0) return 0;
  
  const minQ = new PriorityQueue<Cell>((a, b) => heightMap[a.x][a.y] - heightMap[b.x][b.y]);

  const visited: boolean[][] = [];
  for (let i = 0; i < m; i++) {
    visited[i] = new Array(n).fill(false);
  }
  
  for (let col = 0; col < m; col++) {
    minQ.insert({
      x: 0,
      y: col
    });
    minQ.insert({
      x: n -1,
      y: col
    });
    visited[0][col] = true;
    visited[n-1][col] = true;
  }

  for (let row = 0; row < n; row ++) {
    minQ.insert({
      x: row,
      y: 0,
    });
    minQ.insert({
      x: row,
      y: m-1,
    });
    visited[row][0] = true;
    visited[row][m-1] = true;
  }

  let sum = 0;
  let maxH = -1;
  const directions = [[-1, 0], [1, 0], [0, 1], [0, -1]];

  while (!minQ.isEmpty()) {
    const current = minQ.poll();
    const currentH = heightMap[current.x][current.y];
    maxH = Math.max(maxH, currentH);
    sum += maxH - currentH;

    directions.forEach(d => {
      const nextRow = current.x + d[0];
      const nextCol = current.y + d[1];

      if (nextRow < 0 || nextCol < 0 || nextCol === m || nextRow === n) {
        return;
      }

      minQ.insert({x: nextRow, y: nextCol});
      visited[nextRow][nextCol] = true;
    });
  }

  return sum;
};

interface Cell {
  x: number;
  y: number;
}

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
