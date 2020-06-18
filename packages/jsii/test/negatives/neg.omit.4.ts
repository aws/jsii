///!MATCH_ERROR: Only string-indexed map types are supported

export interface FooBar {
  readonly foo: string;
  readonly bar: string;
}

// Illegal attempt to accept Omit<T, Key>
export interface IReturner {
  bar(opts: Omit<FooBar, 'foo'>): void;
}
