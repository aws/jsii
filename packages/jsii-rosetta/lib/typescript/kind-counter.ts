import * as ts from 'typescript';

export class KindCounter {
  private readonly counter: Record<string, number>;

  public constructor() {
    this.counter = {};
  }

  public countKinds(sourceFile: ts.SourceFile): Record<string, number> {
    this.countNode(sourceFile);
    return this.counter;
  }

  private countNode(node: ts.Node) {
    const value = node.kind.valueOf().toString();
    this.counter[value] = this.counter[value] ? this.counter[value] + 1 : 1;
    node.getChildren().forEach((child) => this.countNode(child));
  }
}
