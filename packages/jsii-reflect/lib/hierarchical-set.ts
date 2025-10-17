export type HierarchicalElement = string[];

interface TrieNode {
  exists: boolean;
  children: Trie;
}
type Trie = Record<string, TrieNode>;

export class HierarchicalSet {
  private readonly root: TrieNode = {
    exists: false,
    children: {},
  };

  public constructor(elements?: Iterable<HierarchicalElement>) {
    if (elements) {
      this.add(elements);
    }
  }

  public add(elements: Iterable<HierarchicalElement>): this {
    for (const element of elements) {
      if (element.length === 0) {
        throw new Error('Elements may not be empty');
      }
      let node = this.root;
      for (const segment of element) {
        if (!(segment in node.children)) {
          node.children[segment] = {
            exists: false,
            children: {},
          };
        }
        node = node.children[segment];
      }
      node.exists = true;
    }
    return this;
  }

  /**
   * Remove every element from LHS that doesn't have a prefix in RHS
   */
  public intersect(rhs: HierarchicalSet): this {
    for (const el of Array.from(this)) {
      let found = false;
      for (let i = 0; i < el.length && !found; i++) {
        found = found || rhs.has(el.slice(0, i + 1));
      }
      if (!found) {
        this.remove([el]);
      }
    }
    return this;
  }

  public remove(rhs: Iterable<HierarchicalElement>): this {
    for (const el of rhs) {
      const found = this.findNode(el);
      if (found) {
        const [parent, key] = found;
        delete parent.children[key];
      }
    }
    return this;
  }

  public get size(): number {
    return Array.from(this).length;
  }

  public [Symbol.iterator](): Iterator<
    HierarchicalElement,
    HierarchicalElement,
    any
  > {
    const stack: Array<{ trie: Trie; keys: string[]; index: number }> = [];
    stack.push({
      trie: this.root.children,
      keys: Object.keys(this.root.children),
      index: 0,
    });
    let done = false;
    let cur: (typeof stack)[number] = stack[stack.length - 1];

    /**
     * Move 'cur' to the next node in the trie
     */
    function advance() {
      // If we can descend, let's
      if (Object.keys(cur.trie[cur.keys[cur.index]].children).length > 0) {
        stack.push({
          trie: cur.trie[cur.keys[cur.index]].children,
          index: 0,
          keys: Object.keys(cur.trie[cur.keys[cur.index]].children),
        });
        cur = stack[stack.length - 1];
        return;
      }

      cur.index += 1;
      while (cur.index >= cur.keys.length) {
        stack.pop();
        if (stack.length === 0) {
          done = true;
          break;
        }
        cur = stack[stack.length - 1];
        // Advance the pointer after coming back.
        cur.index += 1;
      }
    }

    return {
      next(): IteratorResult<HierarchicalElement, HierarchicalElement> {
        while (!done && !cur.trie[cur.keys[cur.index]].exists) {
          advance();
        }
        const value = !done ? stack.map((f) => f.keys[f.index]) : undefined;
        // Node's Array.from doesn't quite correctly implement the iterator protocol.
        // If we return { value: <something>, done: true } it will pretend to never
        // have seen <something>, so we need to split this into 2 steps.
        // The TypeScript typings don't agree, so 'as any' that away.
        const ret = (value ? { value, done } : { done }) as any;
        if (!done) {
          advance();
        }
        return ret;
      },
    };
  }

  public has(el: HierarchicalElement): boolean {
    const found = this.findNode(el);
    if (!found) {
      return false;
    }
    const [node, last] = found;
    return node.children?.[last]?.exists ?? false;
  }

  private findNode(el: HierarchicalElement): [TrieNode, string] | undefined {
    if (el.length === 0) {
      throw new Error('Elements may not be empty');
    }

    const parts = [...el];
    let parent = this.root;
    while (parts.length > 1) {
      const next = parts.splice(0, 1)[0];
      parent = parent.children?.[next];
      if (!parent) {
        return undefined;
      }
    }

    return [parent, parts[0]];
  }
}
