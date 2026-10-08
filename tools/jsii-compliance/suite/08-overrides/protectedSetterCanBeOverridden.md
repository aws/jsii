# The kernel invokes a host override of a protected property setter

A property that is declared as overridable but is not part of the public API (a protected property) MUST be overridable
from the host. When the kernel assigns such a property, it MUST dispatch to the host setter override, passing the value
being assigned. The override MAY transform the value before delegating to the base setter, and a subsequent read MUST
observe the transformed value.

## Reference Implementation

```ts
// GIVEN
export class OverridableProtectedMember {
  protected readonly overrideReadOnly: string = 'Baz';
  protected overrideReadWrite = 'zinga!';

  public valueFromProtected(): string {
    return this.overrideMe();
  }

  public switchModes(): void {
    this.overrideReadWrite = 'zaar...';
  }

  protected overrideMe(): string {
    return this.overrideReadOnly + this.overrideReadWrite;
  }
}

// Host subclass overriding the protected property setter.
class Overridden extends OverridableProtectedMember {
  protected override set overrideReadWrite(value: string) {
    super.overrideReadWrite = 'zzzzzzzzz' + value;
  }
}

// WHEN
// switchModes assigns overrideReadWrite in the kernel, which dispatches to the host setter.
const overridden = new Overridden();
overridden.switchModes();

// THEN
expect(overridden.valueFromProtected()).toBe('Bazzzzzzzzzzzaar...');
```
