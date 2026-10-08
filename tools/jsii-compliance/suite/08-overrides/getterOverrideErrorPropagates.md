# An error thrown by a host property getter propagates to the caller

When a host override of a property getter throws, and the kernel reads that property, the kernel MUST surface the error
back to the host caller that triggered the read, rather than returning a value. The error message the host raised MUST
be preserved as it crosses the boundary and returns.

## Reference Implementation

```ts
// GIVEN
export class SyncVirtualMethods {
  public theProperty = 'initial value';

  public retrieveValueOfTheProperty() {
    return this.theProperty;
  }
}

// Host subclass whose getter override throws.
class SyncOverrides extends SyncVirtualMethods {
  public override get theProperty(): string {
    throw new Error('Oh no, this is bad');
  }
}

// WHEN
const so = new SyncOverrides();

// THEN
expect(() => so.retrieveValueOfTheProperty()).toThrow('Oh no, this is bad');
```
