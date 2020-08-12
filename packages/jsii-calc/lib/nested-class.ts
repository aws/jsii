import { submodule } from '@scope/jsii-calc-lib';

export class NestedClassInstance {
  public static makeInstance(): submodule.NestingClass.NestedClass {
    return new submodule.NestingClass.NestedClass();
  }

  private constructor() {}
}
