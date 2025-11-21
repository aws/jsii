import { BLike } from '../module4971_2';

export interface ALike {
  readonly isA: boolean;
}

export interface AProps {
  // The cyclic reference must be in a union in a struct, otherwise we get compilation errors in Go
  readonly b?: BLike | string;
}

export class A {
  public readonly isA: boolean = true;

  public constructor(props?: AProps) {
    console.log(props?.b);
  }
}
