export interface FooBar {
  readonly foo: string;
  readonly bar: string;
}

// Illegal attempt to extend Omit<T, Key>
export interface BarBaz extends Omit<FooBar, 'foo'> {
  readonly baz: number;
}
