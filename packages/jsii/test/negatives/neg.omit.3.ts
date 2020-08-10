export interface FooBar {
  readonly foo: string;
  readonly bar: string;
}

// Illegal attempt to return Omit<T, Key>
export interface IReturner {
  bar(): Omit<FooBar, 'foo'>;
}
