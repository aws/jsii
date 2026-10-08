# A host method is not an override of a private method of the same name

A private member of a jsii class is internal to JavaScript and is not part of the type exposed to the host. When a host
subclass declares a method whose name coincides with such a private method, the host MUST NOT register that method as an
override: it MUST NOT be included in the set of overrides the host declares to the kernel. The kernel MUST continue to
use its own private method, so a kernel call that reaches the private method MUST return the original value.

## Reference Implementation

```ts
// GIVEN
export class DoNotOverridePrivates {
  private privateMethod(): string {
    return 'privateMethod';
  }

  public privateMethodValue() {
    return this.privateMethod();
  }
}

// Host subclass with a public member whose name coincides with the private method.
class Override extends DoNotOverridePrivates {
  public privateMethod(): string {
    return 'privateMethod-Override';
  }
}

// WHEN
const obj = new Override();

// THEN
// The kernel calls its own private method, not the host member.
expect(obj.privateMethodValue()).toBe('privateMethod');
```
