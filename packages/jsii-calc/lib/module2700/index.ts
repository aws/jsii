export interface IFoo {
  bar(): string;
  readonly baz: number;
}

export class Base implements IFoo {
  public readonly baz = 120;
  public bar() {
    return 'bar';
  }
}

export class Derived extends Base implements IFoo {
  public zoo() {
    return 'zoo';
  }
}
