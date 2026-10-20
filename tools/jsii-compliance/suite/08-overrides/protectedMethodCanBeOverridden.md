# The kernel invokes a host override of a protected method

A member that is declared as overridable but is not part of the public API (a protected member) MUST be overridable from
the host. When the kernel invokes such a method, it MUST dispatch to the host override and use the value the override
returns, exactly as it does for a public overridable method.

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

// Host subclass overriding the protected method.
class Overridden extends OverridableProtectedMember {
  protected override overrideMe(): string {
    return 'Cthulhu Fhtagn!';
  }
}

// WHEN
const overridden = new Overridden();

// THEN
expect(overridden.valueFromProtected()).toBe('Cthulhu Fhtagn!');
```
