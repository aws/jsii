import { B } from '../module4971_2';

export interface AProps {
  readonly b?: B;
}

export class A {
  public constructor(props?: AProps) {
    console.log(props?.b);
  }
}
