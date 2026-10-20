# The host can implement an interface indirectly through a superclass

The host MAY implement a behavioral interface indirectly: a type that does not itself declare the interface, but
inherits the implementation from a superclass that does. The host MUST still be able to pass such a value to the kernel
as that interface, and the kernel MUST be able to invoke the interface's members on it.

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

// WHEN
const expected: StructB = { requiredString: 'Present!' };
// The interface is declared on the base type; the leaf type only inherits it.
class ImplementsStructReturningDelegate implements IStructReturningDelegate {
  public constructor(private readonly struct: StructB) {}
  public returnStruct(): StructB {
    return this.struct;
  }
}
class IndirectlyImplementsStructReturningDelegate extends ImplementsStructReturningDelegate {}

const consumer = new ConsumePureInterface(new IndirectlyImplementsStructReturningDelegate(expected));

// THEN
expect(consumer.workItBaby()).toEqual(expected);
```
