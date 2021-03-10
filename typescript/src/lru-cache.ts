class LRUCache {
  private readonly head: Node;
  private readonly tail: Node;

  private readonly nodes = new Map<number, Node>();

  constructor(private readonly capacity: number) {
    const head = new Node(-1, -1); // Dummy nodes to avoid null checking
    const tail = new Node(-2, -2);

    head.next = tail;
    tail.prev = head;

    this.head = head;
    this.tail = tail;
  }

  get(key: number): number {
    const node = this.nodes.get(key);
    if (!node) return -1;
    this.moveToFront(node);
    return node.value;
  }

  put(key: number, value: number): void {
    let node = this.nodes.get(key);
    if (node) {
      this.moveToFront(node);
      node.value = value;
    } else {
      node = new Node(key, value);
      this.moveToFront(node);
      this.nodes.set(key, node);

      if (this.nodes.size > this.capacity) {
        const lru = this.tail.prev;
        if (lru !== this.head) {
          this.tail.prev = this.tail.prev.prev;
          this.tail.prev.next = this.tail;
          this.nodes.delete(lru.key);
        }
      }
    }
  }

  private moveToFront(node: Node) {
    if (node.prev) {
      node.prev.next = node.next;
    }
    if (node.next) {
      node.next.prev = node.prev;
    }

    const previousMru = this.head.next;

    node.prev = this.head;
    node.next = previousMru;

    previousMru.prev = node;
    this.head.next = node;
  }
}

class Node {
  public constructor(public key: number,
    public value: number,
    public prev?: Node,
    public next?: Node) { } i
}
