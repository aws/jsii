# Object references round-trip through an `any`-typed property

When the host assigns an object reference to a property of type `any` and then reads it back, it MUST receive a reference
to the same underlying object. For an object created in the kernel, the returned reference MUST carry that object's
kernel type. For an object the host created (an instance of a host subclass), the kernel MUST return the same object
reference, and the host MUST resolve it back to the very instance it created, so object identity is preserved across the
boundary.

## Reference Implementation

```ts
// GIVEN
export abstract class NumericValue {
  public abstract readonly value: number;
}
export class Number extends NumericValue {
  public constructor(public readonly value: number) {
    super();
  }
}
export class Add extends NumericValue {
  public constructor(public readonly lhs: NumericValue, public readonly rhs: NumericValue) {
    super();
  }
  public get value() {
    return this.lhs.value + this.rhs.value;
  }
}
export class AllTypes {
  public anyProperty: any;
}

// WHEN
const types = new AllTypes();

// An object created in the kernel keeps its kernel type.
const kernelObject = new Number(44);
types.anyProperty = kernelObject;
const roundTrippedKernelObject = types.anyProperty;

// An object created by the host comes back as the same host instance.
class AddTen extends Add {
  public constructor(value: number) {
    super(new Number(value), new Number(10));
  }
}
const hostObject = new AddTen(10);
types.anyProperty = hostObject;
const roundTrippedHostObject = types.anyProperty;

// THEN
expect(roundTrippedKernelObject).toBeInstanceOf(Number);
expect(roundTrippedKernelObject).toBe(kernelObject);
expect(roundTrippedHostObject).toBe(hostObject);
```
