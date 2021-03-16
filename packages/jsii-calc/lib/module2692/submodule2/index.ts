import { Bar as Bar1 } from '../submodule1';

export interface Bar {
  readonly bar2: string;
}

export interface Foo extends Bar, Bar1 {
  readonly foo2: string;
}
