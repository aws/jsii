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
    //ts.forEachChild(node, (x) => this.countNode(x))
    node.getChildren().forEach((child) => this.countNode(child));
  }
}
