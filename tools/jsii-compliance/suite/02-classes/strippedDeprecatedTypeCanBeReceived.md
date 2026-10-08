# Instances of stripped deprecated types can be received

When the kernel returns a value declared as an interface, but whose concrete class has been removed from the host's type
information (for example because deprecated members were stripped from the type metadata), the host MUST still receive a
usable object reference typed as the declared interface. The host MUST NOT fail merely because the concrete type is not
present in its loaded type information.

## Reference Implementation

```ts
// GIVEN
export interface IInterface {
  method(): void;
}

export class VisibleBaseClass {
  public readonly propertyPresent = true;
}

/** @deprecated do not use me! */
export class DeprecatedImplementation extends VisibleBaseClass implements IInterface {
  public method(): void {
    /* NOOP */
  }
}

export class InterfaceFactory {
  public static create(): IInterface {
    return new DeprecatedImplementation();
  }

  private constructor() {}
}

// WHEN
const instance = InterfaceFactory.create();

// THEN
expect(instance).toBeDefined();
```
