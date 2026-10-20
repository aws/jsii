# An error thrown by a host property setter propagates to the caller

When a host override of a property setter throws, and the kernel assigns that property, the kernel MUST surface the error
back to the host caller that triggered the write, rather than completing the assignment. The error message the host
raised MUST be preserved as it crosses the boundary and returns.

## Reference Implementation

```ts
// GIVEN
export class SyncVirtualMethods {
  public theProperty = 'initial value';

  public modifyValueOfTheProperty(value: string) {
    this.theProperty = value;
  }
}

// Host subclass whose setter override throws.
class SyncOverrides extends SyncVirtualMethods {
  public override set theProperty(value: string) {
    throw new Error('Exception from overloaded setter');
  }
}

// WHEN
const so = new SyncOverrides();

// THEN
expect(() => so.modifyValueOfTheProperty('Hii')).toThrow('Exception from overloaded setter');
```
