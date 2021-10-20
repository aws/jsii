import * as ts from 'typescript';

export class SyntaxKindCounter {
  private readonly counter: Record<string, number>;

  public constructor() {
    this.counter = {};
  }

  public countKinds(sourceFile: ts.SourceFile): Record<string, number> {
    this.countNode(sourceFile);
    return this.counter;
  }

  private countNode(node: ts.Node) {
    const value = node.kind.valueOf();
    this.counter[value] = this.counter[value] ? this.counter[value] + 1 : 1;
    // The two recursive options produce differing results. `ts.forEachChild()` ignores some unimportant kinds.
    // `node.getChildren()` goes through all syntax kinds.
    // see: https://basarat.gitbook.io/typescript/overview/ast/ast-tip-children
    ts.forEachChild(node, (x) => this.countNode(x));
    //node.getChildren().forEach((child) => this.countNode(child));
  }
}
