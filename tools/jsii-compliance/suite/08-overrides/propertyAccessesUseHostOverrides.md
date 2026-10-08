# The kernel dispatches property reads and writes to host overrides

When a host subclass overrides a jsii property with a getter and a setter, the kernel MUST invoke the host getter
whenever the property is read from JavaScript, and MUST invoke the host setter whenever the property is assigned from
JavaScript, passing the assigned value to the setter. The host override replaces the kernel's own accessor for both
directions.

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

// Host subclass overriding both the getter and the setter of `theProperty`.
class SyncOverrides extends SyncVirtualMethods {
  public anotherTheProperty = '';

  public override get theProperty() {
    return 'I am an override!';
  }
  public override set theProperty(value: string) {
    this.anotherTheProperty = value;
  }
}

// WHEN
const so = new SyncOverrides();

// THEN
// Reading the property in the kernel dispatches to the host getter.
expect(so.retrieveValueOfTheProperty()).toBe('I am an override!');

// Writing the property in the kernel dispatches to the host setter.
so.modifyValueOfTheProperty('New Value');
expect(so.anotherTheProperty).toBe('New Value');
```
