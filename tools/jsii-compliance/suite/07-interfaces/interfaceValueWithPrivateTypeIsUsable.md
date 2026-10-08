# A value returned as an interface is usable even when its concrete type is private

When the kernel returns a value whose concrete type is not exported, the host MUST receive it typed as the declared
return type — whether that is a behavioral interface or an exported class — and MUST be able to use the members of that
declared type. The same underlying value MUST be usable through each declared type the kernel exposes it as.

## Reference Implementation

```ts
// GIVEN
export class Implementation {
  public readonly value = 1337;
}
export interface IAnonymouslyImplementMe {
  readonly value: number;
  verb(): string;
}
export interface IAnonymousImplementationProvider {
  provideAsInterface(): IAnonymouslyImplementMe;
  provideAsClass(): Implementation;
}

// The concrete type is not exported from the assembly.
class PrivateType extends Implementation implements IAnonymouslyImplementMe {
  public verb() {
    return 'to implement';
  }
}

export class AnonymousImplementationProvider implements IAnonymousImplementationProvider {
  private readonly instance = new PrivateType();

  public provideAsClass(): Implementation {
    return this.instance;
  }
  public provideAsInterface(): IAnonymouslyImplementMe {
    return this.instance;
  }
}

// WHEN
const provider = new AnonymousImplementationProvider();

// THEN
expect(provider.provideAsClass().value).toBe(1337);
expect(provider.provideAsInterface().value).toBe(1337);
expect(provider.provideAsInterface().verb()).toBe('to implement');
```
