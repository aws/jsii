import { ClassWithNONPASCALCASEDName } from '@scope/jsii-calc-lib/build/submodule';

export interface NonPascalCaseTestProps {
  readonly someType: ClassWithNONPASCALCASEDName.SomeType;
}

export class NonPascalCaseTest {
  public readonly someType: ClassWithNONPASCALCASEDName.SomeType;

  public constructor(public readonly props: NonPascalCaseTestProps) {
    this.someType = props.someType;
  }
}
