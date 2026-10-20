# A struct declared in a submodule can be constructed and passed

A struct type may be declared inside a submodule (namespace) of an assembly, rather than at the top level. The host MUST
be able to construct a value of such a struct and pass it across the boundary to a kernel method, with the struct
serialized by value exactly like a top-level struct.

## Reference Implementation

```ts
// GIVEN
// Declared inside a submodule of a dependency assembly.
export namespace submodule {
  export interface NestedStruct {
    readonly name: string;
  }
}

export class StaticConsumer {
  public static consume(...args: any[]) {
    // Accepts any arguments, including structs, and ignores them.
  }
}

// WHEN / THEN
const nested: submodule.NestedStruct = { name: 'Bond, James Bond' };
expect(() => StaticConsumer.consume(nested)).not.toThrow();
```
