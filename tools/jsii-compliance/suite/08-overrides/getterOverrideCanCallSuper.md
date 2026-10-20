# A host property getter override can read the base value

When a host override of a property getter reads the base class value of that property, the kernel MUST return the value
held in JavaScript. The override MAY combine that value with its own logic before returning it. When the kernel reads
the property, it MUST dispatch to the host getter, which in turn observes the base value.

## Reference Implementation

```ts
// GIVEN
export class SyncVirtualMethods {
  public theProperty = 'initial value';

  public retrieveValueOfTheProperty() {
    return this.theProperty;
  }
}

// Host subclass whose getter override reads the base value.
class SyncOverrides extends SyncVirtualMethods {
  public override get theProperty() {
    return 'super:' + super.theProperty;
  }
}

// WHEN
const so = new SyncOverrides();

// THEN
expect(so.retrieveValueOfTheProperty()).toBe('super:initial value');
```
