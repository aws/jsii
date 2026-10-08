# Struct properties named like reserved words remain usable

A struct (data) property whose name is a reserved word in the host language MUST remain usable: the host MUST be able to
set it when creating the struct and read it back from the resulting value, under a deterministic, documented alternate
name chosen by the binding. Each property MUST map to its original JavaScript name across the boundary.

## Reference Implementation

```ts
// GIVEN
export interface StructWithJavaReservedWords {
  readonly default: string;
  readonly assert?: string;
}

// WHEN
const struct: StructWithJavaReservedWords = { default: 'two', assert: 'one' };

// THEN
expect(struct.assert).toBe('one');
expect(struct.default).toBe('two');
```
