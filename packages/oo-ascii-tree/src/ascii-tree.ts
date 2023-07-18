/**
 * A tree of nodes that can be ASCII visualized.
 */

export class AsciiTree {
  /**
   * The parent node.
   */
  public parent?: AsciiTree;

  private readonly _children = new Array<AsciiTree>();

  /**
   * Creates a node.
   * @param text The node's text content
   * @param children Children of this node (can also be added via "add")
   */
  public constructor(
    public readonly text?: string,
    ...children: AsciiTree[]
  ) {
    for (const child of children) {
      this.add(child);
    }
  }

  /**
   * Prints the tree to an output stream.
   */
  public printTree(output: Printer = process.stdout) {
    let ancestorsPrefix = '';

    for (const parent of this.ancestors) {
      // -1 represents a "hidden" root, and so it's children
      // will all appear as roots (level 0).
      if (parent.level <= 0) {
        continue;
      }

      if (parent.last) {
        ancestorsPrefix += '  ';
      } else {
        ancestorsPrefix += ' │';
      }
    }

    let myPrefix = '';
    let multilinePrefix = '';
    if (this.level > 0) {
      if (this.last) {
        if (!this.empty) {
          myPrefix += ' └─┬ ';
          multilinePrefix += ' └─┬ ';
        } else {
          myPrefix += ' └── ';
          multilinePrefix = '     ';
        }
      } else {
        if (!this.empty) {
          myPrefix += ' ├─┬ ';
          multilinePrefix += ' │ │ ';
        } else {
          myPrefix += ' ├── ';
          multilinePrefix += ' │   ';
        }
      }
    }

    if (this.text) {
      output.write(ancestorsPrefix);
      output.write(myPrefix);
      const lines = this.text.split('\n');
      output.write(lines[0]);
      output.write('\n');

      for (const line of lines.splice(1)) {
        output.write(ancestorsPrefix);
        output.write(multilinePrefix);
        output.write(line);
        output.write('\n');
      }
    }

    for (const child of this._children) {
      child.printTree(output);
    }
  }

  /**
   * Returns a string representation of the tree.
   */
  public toString() {
    let out = '';
    const printer: Printer = {
      write: (data: Uint8Array | string) => {
        // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
        out += data;
        return true;
      },
    };
    this.printTree(printer);
    return out;
  }

  /**
   * Adds children to the node.
   */
  public add(...children: AsciiTree[]) {
    for (const child of children) {
      child.parent = this;
      this._children.push(child);
    }
  }

  /**
   * Returns a copy of the children array.
   */
  public get children() {
    return this._children.map((x) => x);
  }

  /**
   * @returns true if this is the root node
   */
  public get root(): boolean {
    return !this.parent;
  }

  /**
   * @returns true if this is the last child
   */
  public get last(): boolean {
    if (!this.parent) {
      return true;
    }
    return (
      this.parent.children.indexOf(this) === this.parent.children.length - 1
    );
  }

  /**
   * @returns the node level (0 is the root node)
   */
  public get level(): number {
    if (!this.parent) {
      // if the root node does not have text, it will be considered level -1
      // so that all it's children will be roots.
      return this.text ? 0 : -1;
    }

    return this.parent.level + 1;
  }

  /**
   * @returns true if this node does not have any children
   */
  public get empty() {
    return this.children.length === 0;
  }

  /**
   * @returns an array of parent nodes (from the root to this node, exclusive)
   */
  public get ancestors(): AsciiTree[] {
    if (!this.parent) {
      return [];
    }

    return [...this.parent.ancestors, this.parent];
  }
}

export type Printer = Pick<NodeJS.WritableStream, 'write'>;
