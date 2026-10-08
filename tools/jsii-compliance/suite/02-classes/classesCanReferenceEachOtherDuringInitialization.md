# Classes can reference other classes during initialization

The host MUST be able to instantiate a class whose constructor creates and references other jsii classes, and whose
referenced types perform their own static initialization during that process. The resulting object reference MUST expose
the nested object produced during initialization.

## Reference Implementation

```ts
// GIVEN
export enum SomeEnum {
  SOME = 'SOME',
}
export interface SomeStruct {
  readonly prop: SomeEnum;
}

export class InnerClass {
  public static readonly staticProp: SomeStruct = { prop: SomeEnum.SOME };
}

export class OuterClass {
  public readonly innerClass: InnerClass;

  public constructor() {
    this.innerClass = new InnerClass();
  }
}

// WHEN
const outer = new OuterClass();

// THEN
expect(outer.innerClass).toBeDefined();
```
