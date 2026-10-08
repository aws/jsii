# Types not explicitly loaded by the host can be received and used

When the kernel returns an object reference whose type the host application never explicitly loaded or named, the host
MUST still receive a usable reference and MUST be able to invoke the declared members on it. This includes the case where
such a reference is delivered to a host callback as an argument during an override, with its type belonging to a module
the host never imported.

## Reference Implementation

```ts
// GIVEN
export interface IRandomNumberGenerator {
  next(): number;
}

/** `UnimportedType` lives in a submodule the host never explicitly loads. */
class UnimportedType implements IRandomNumberGenerator {
  public constructor(private readonly n: number) {}
  public next() {
    return this.n;
  }
}

export abstract class Cdk16625 {
  protected abstract unwrap(gen: IRandomNumberGenerator): number;

  public test(): void {
    const value = 1337;
    const rng = new UnimportedType(value);
    if (this.unwrap(rng) !== value) {
      throw new Error('unexpected value');
    }
  }
}

// WHEN
class Subject extends Cdk16625 {
  protected unwrap(gen: IRandomNumberGenerator): number {
    return gen.next();
  }
}

// THEN
expect(() => new Subject().test()).not.toThrow();
```
