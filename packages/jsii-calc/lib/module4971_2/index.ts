import { ALike } from '../module4971_1';

export interface BLike {
  readonly isB: boolean;
}

export interface BProps {
  // The cyclic reference must be in a union in a struct, otherwise we get compilation errors in Go
  readonly a?: ALike | string;
}

export class B {
  public readonly isB: boolean = true;

  public constructor(props?: BProps) {
    console.log(props?.a);
  }
}
