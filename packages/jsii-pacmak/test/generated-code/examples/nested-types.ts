// See: https://github.com/aws/jsii/issues/2649

export class Namespace1 {
  public foo() {
    return;
  }
}

export class Namespace2 {
  public foo() {
    return;
  }
}

export namespace Namespace1 {
  // Effectively Namespace1.Foo
  export interface Foo {
    readonly bar: string;
  }

  // Effectively Namespace1.IBar
  export interface IBar {
    readonly bar: string;
    method(): void;
  }
}

export namespace Namespace2 {
  // Effectively Namespace2.Foo
  export enum Foo {
    BAR,
    BAZ,
  }

  export namespace Foo {
    // Effectively Namespace2.Foo.Final
    export class Final {
      public readonly done = true;
    }
  }
}
