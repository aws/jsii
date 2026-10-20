# A host method is not an override of a private property of the same name

A private member of a jsii class is internal to JavaScript and is not part of the type exposed to the host. When a host
subclass declares a method whose name coincides with such a private property, the host MUST NOT register that method as
an override: it MUST NOT be included in the set of overrides the host declares to the kernel. The kernel MUST continue
to use its own private property, so a kernel call that reads the private property MUST return the original value.

## Reference Implementation

```ts
// GIVEN
export class DoNotOverridePrivates {
  private privateProperty = 'privateProperty';

  public privatePropertyValue() {
    return this.privateProperty;
  }
}

// Host subclass with a public method whose name coincides with the private property.
class Override extends DoNotOverridePrivates {
  public privateProperty(): string {
    return 'privateProperty-Override';
  }
}

// WHEN
const obj = new Override();

// THEN
// The kernel reads its own private property, not the host member.
expect(obj.privatePropertyValue()).toBe('privateProperty');
```
