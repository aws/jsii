// There will be a conflict between the static method and nested type in certain
// languages, including C# and Go, where methods are PascalCased.

export class ParentClass {
  public static nestedStruct(): boolean {
    return false;
  }

  private constructor() {}
}

export namespace ParentClass {
  export interface NestedStruct {
    readonly field: number;
  }
}
