export interface FooBar {
  readonly foo: string;
  readonly bar: string;
}

// Illegal attempt to implement Omit<T, Key>
export class BarBaz implements Omit<FooBar, 'foo'> {
  public readonly bar = 'BAR!';
  public readonly baz: number = 1337;
}
