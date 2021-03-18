// See: https://github.com/aws/jsii/issues/2653

export interface Foo {
  readonly foo: number;
}

export interface FooBar {
  readonly foo: number;
  readonly bar?: string;
}

export interface Baz extends Foo, FooBar {
  readonly baz: boolean;
}

export class Consumer {
  public static consumeBaz(baz: Baz): void {
    new Consumer(baz);
  }

  private constructor(_: any) {}
}
