/* eslint-disable @typescript-eslint/no-namespace */
export class SomeContainingClass {
  public sayHello() {
    return 'hello';
  }
}

/**
 * Check that we can have 2 interfaces in a class namespace inherit from each other
 *
 * This gave trouble in Python.
 *
 * Also purposely have the types in the wrong order in the source code to catch potential ordering mistakes.
 */
export namespace SomeContainingClass {
  export interface ChildStruct extends ParentStruct {
    readonly field2: string;
  }

  export interface ParentStruct {
    readonly field1: string;
  }
}
