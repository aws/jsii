# References to classes with union-typed properties can be obtained

The host MUST be able to obtain, through a static method, an object reference to a class that declares a settable
property whose type is a union (including a union whose members are arrays). Returning such a reference MUST NOT require
the kernel or the host to resolve the union, and the host MUST receive a usable reference.

## Reference Implementation

```ts
// GIVEN
export interface IFriendly {
  hello(): string;
}

export abstract class AbstractClass {
  public abstract abstractMethod(name: string): string;
}

export class ConfusingToJackson {
  public static makeInstance(): ConfusingToJackson {
    return new ConfusingToJackson();
  }

  public unionProperty?: Array<IFriendly | AbstractClass> | IFriendly;

  private constructor() {}
}

// WHEN
const instance = ConfusingToJackson.makeInstance();

// THEN
expect(instance).toBeInstanceOf(ConfusingToJackson);
```
