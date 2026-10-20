# The kernel invokes a host override of a protected property getter

A property that is declared as overridable but is not part of the public API (a protected property) MUST be overridable
from the host. When the kernel reads such a property, it MUST dispatch to the host getter override and use the value it
returns, exactly as it does for a public overridable property.

## Reference Implementation

```ts
// GIVEN
export class OverridableProtectedMember {
  protected readonly overrideReadOnly: string = 'Baz';
  protected overrideReadWrite = 'zinga!';

  public valueFromProtected(): string {
    return this.overrideMe();
  }

  protected overrideMe(): string {
    return this.overrideReadOnly + this.overrideReadWrite;
  }
}

// Host subclass overriding the protected property getters.
class Overridden extends OverridableProtectedMember {
  protected override get overrideReadOnly(): string {
    return 'Cthulhu ';
  }
  protected override get overrideReadWrite(): string {
    return 'Fhtagn!';
  }
}

// WHEN
// valueFromProtected calls overrideMe in the kernel, which reads the two protected properties.
const overridden = new Overridden();

// THEN
expect(overridden.valueFromProtected()).toBe('Cthulhu Fhtagn!');
```
