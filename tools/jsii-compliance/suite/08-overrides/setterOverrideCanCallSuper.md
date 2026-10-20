# A host property setter override can write the base value

When a host override of a property setter assigns the base class value of that property, the kernel MUST store the value
in JavaScript. The override MAY transform the assigned value before delegating to the base setter. A subsequent read of
the property MUST return the transformed value that the override stored.

## Reference Implementation

```ts
// GIVEN
export class SyncVirtualMethods {
  public theProperty = 'initial value';

  public modifyValueOfTheProperty(value: string) {
    this.theProperty = value;
  }

  public retrieveValueOfTheProperty() {
    return this.theProperty;
  }
}

// Host subclass whose setter override transforms the value, then writes the base value.
class SyncOverrides extends SyncVirtualMethods {
  public override set theProperty(value: string) {
    super.theProperty = value + ':by override';
  }
}

// WHEN
const so = new SyncOverrides();
so.modifyValueOfTheProperty('New Value');

// THEN
expect(so.retrieveValueOfTheProperty()).toBe('New Value:by override');
```
