function sortItems(n: number, m: number, group: number[], beforeItems: number[][]): number[] {
  const itemGraph = new Graph<number>();
  const groupGraph = new Graph<number>();

  for (let i = 0; i < n; i++) {
    beforeItems[i].forEach(j => {
      const groupI = group[i] + 1; // +1 Handles the -1 group.
      const groupJ = group[j] + 1;
      if (groupI !== groupJ) {
        groupGraph.setEdge(groupI, groupJ);
      }
    });
  }

  const itemOrdering = itemGraph.sort();
  const groupOrdering = groupGraph.sort();

  if (itemOrdering.length === 0 || groupOrdering.length === 0) {
    return [];
  }

  const orderWithinGroup = new Map<number, number[]>();

  itemOrdering.forEach(i => {
    const g = group[i] + 1;
    if (orderWithinGroup.get(g) == null) {
      orderWithinGroup.set(g, []);
    }
    orderWithinGroup.get(g).push(i);
  });
  
  const solution: number[] = [];

  groupOrdering.forEach(g => {
    if (!orderWithinGroup.has(g)) return;
    orderWithinGroup.get(g).forEach(i => {
      solution.push(i);
    });
  });

  return solution;
};

interface Edge<TN, TE = {}> {
  to: TN;
  label: TE;
}

class Graph<TN, TE = {}> {

  private readonly nodes: Set<TN> = new Set();
  private readonly edges: Map<TN, Set<Edge<TN, TE>>> = new Map();

  public addNode(u: TN) {
    if (this.nodes.has(u)) {
      throw Error(`Node already exists: ${u}`);
    }
    this.nodes.add(u);
    this.edges.set(u, new Set());
  }

  public addNodeIfNotExists(u: TN) {
    if (this.nodes.has(u)) return;
    this.addNode(u);
  }

  public setEdge(u: TN, v: TN, label?: TE) {
    this.addNodeIfNotExists(u);
    this.addNodeIfNotExists(v);
    this.edges.get(u).add({
      to: v,
      label,
    });
  }

  public sort(): TN[] {
    const ranks: Map<TN, number> = new Map();
    [...this.edges.entries()].forEach(([key, value]) => {
      ranks.set(key, value.size);
    });

    const q: TN[] = [];
    // Push nodes with no dependencies.
    this.nodes.forEach(n => {
      if (ranks.get(n) === 0) {
        q.push(n);
      }
    });

    let resolvedNodeCount = 0;
    const solution: TN[] = [];

    while (!(q.length === 0)) {
      const next = solution.splice(0, 1)[0];
      
      this.edges.get(next)?.forEach(e => {
        ranks.set(e.to, ranks.get(e.to) - 1);
        if (ranks.get(e.to) === 0) {
          q.push(e.to);
        }
      });
      
      solution.push(next);
      resolvedNodeCount++;
    }
    
    // No solution.
    if (resolvedNodeCount !== this.nodes.size) {
      return [];
    }

    return solution;
  }
}