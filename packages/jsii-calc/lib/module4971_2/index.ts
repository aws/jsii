import { A } from '../module4971_1';

export interface BProps {
  readonly a?: A;
}

export class B {
  public constructor(props?: BProps) {
    console.log(props?.a);
  }
}
