# Methods named like reserved words remain callable

A method whose name is a reserved word in the host language MUST remain callable from the host, under a deterministic,
documented alternate name chosen by the binding. Invoking it MUST call the original method in the kernel, identified by
its original JavaScript name.

## Reference Implementation

```ts
// GIVEN
// `JavaReservedWords` declares one method per word that is reserved in some host languages; a representative
// subset is shown here.
export class JavaReservedWords {
  public import() {
    return;
  }
  public const() {
    return;
  }
}

// WHEN / THEN
const obj = new JavaReservedWords();

expect(() => obj.import()).not.toThrow();
expect(() => obj.const()).not.toThrow();
```
