# The host can implement an interface from scratch and pass it to the kernel

The host MUST be able to implement a behavioral interface entirely on its own, with a type that implements the interface
without deriving from any kernel type, and pass that implementation across the boundary to the kernel. The kernel MUST
be able to invoke the implementation's members, and the values the host returns MUST be delivered back to the kernel
unchanged.

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
class Delegate implements IStructReturningDelegate {
  public returnStruct(): StructB {
    return expected;
  }
}
const consumer = new ConsumePureInterface(new Delegate());

// THEN
expect(consumer.workItBaby()).toEqual(expected);
```
