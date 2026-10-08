# A host accessor is not an override of a private property

A private member of a jsii class is internal to JavaScript and is not part of the type exposed to the host. When a host
subclass declares a property accessor whose name coincides with such a private property, the host MUST NOT register the
accessor as an override. The kernel MUST continue to use its own private property for both reads and writes: a kernel
read MUST return the original value, and a kernel write MUST update the kernel's own property without dispatching to the
host setter.

## Reference Implementation

```ts
// GIVEN
export class DoNotOverridePrivates {
  private privateProperty = 'privateProperty';

  public privatePropertyValue() {
    return this.privateProperty;
  }

  public changePrivatePropertyValue(newValue: string) {
    this.privateProperty = newValue;
  }
}

// Host subclass with a public accessor whose name coincides with the private property.
class Override extends DoNotOverridePrivates {
  public get privateProperty(): string {
    return 'privateProperty-Override';
  }
  public set privateProperty(value: string) {
    throw new Error('Boom');
  }
}

// WHEN
const obj = new Override();

// THEN
// The host getter is not registered, so the kernel reads its own property.
expect(obj.privatePropertyValue()).toBe('privateProperty');

// The host setter is not registered either: the write updates the kernel's property and does not throw.
obj.changePrivatePropertyValue('MyNewValue');
expect(obj.privatePropertyValue()).toBe('MyNewValue');
```
