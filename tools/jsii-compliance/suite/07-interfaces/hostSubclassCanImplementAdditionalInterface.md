# A host subclass of a kernel class can also implement an interface

A host type MAY both subclass a kernel class and implement a behavioral interface declared by the kernel. The host MUST
be able to pass such a value to the kernel as that interface, and the kernel MUST be able to invoke the interface's
members on it, even though the value's primary identity is that of the kernel class it extends.

## Reference Implementation

```ts
// GIVEN
export interface StructB {
  readonly requiredString: string;
  readonly optionalBoolean?: boolean;
}

export interface IStructReturningDelegate {
  returnStruct(): StructB;
}

export class ConsumePureInterface {
  public constructor(private readonly delegate: IStructReturningDelegate) {}

  public workItBaby() {
    return this.delegate.returnStruct();
  }
}

// A kernel class that the host will subclass.
export class AllTypes {
  public stringProperty = '';
}

// WHEN
const expected: StructB = { requiredString: 'Present!' };
class ImplementsAdditionalInterface extends AllTypes implements IStructReturningDelegate {
  public constructor(private readonly struct: StructB) {
    super();
  }
  public returnStruct(): StructB {
    return this.struct;
  }
}

const consumer = new ConsumePureInterface(new ImplementsAdditionalInterface(expected));

// THEN
expect(consumer.workItBaby()).toEqual(expected);
```
