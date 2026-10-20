# Instances of non-exported classes are received as their interface

When the kernel returns an instance of a class that is not exported from the library, declared as an interface type, the
host MUST receive a usable object reference and MUST be able to read the interface's properties on it. The host MUST NOT
require the concrete (private) type to be known in order to use the value.

## Reference Implementation

```ts
// GIVEN
export interface IPrivatelyImplemented {
  readonly success: boolean;
}

export class ExportedBaseClass {
  public constructor(public readonly success: boolean) {}
}

class PrivateImplementation extends ExportedBaseClass implements IPrivatelyImplemented {
  public constructor() {
    super(true);
  }
}

export class ReturnsPrivateImplementationOfInterface {
  public get privateImplementation(): IPrivatelyImplemented {
    return new PrivateImplementation();
  }
}

// WHEN
const impl = new ReturnsPrivateImplementationOfInterface().privateImplementation;

// THEN
expect(impl.success).toBe(true);
```
