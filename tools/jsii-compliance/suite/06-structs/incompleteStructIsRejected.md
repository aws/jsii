# Constructing a struct without a required property is rejected

When a struct declares a required (non-optional) property, the host MUST NOT allow a struct value that omits that
property to be constructed and passed to the kernel. Attempting to construct such an incomplete struct MUST result in an
error on the host, and the host MUST NOT send an incomplete struct across the boundary. In the kernel messages, this is
observable as the absence of any message carrying the incomplete struct.

## Reference Implementation

```ts
// GIVEN
export interface MyFirstStruct {
  readonly astring: string; // required
  readonly anumber: number; // required
  readonly firstOptional?: string[];
}

// WHEN / THEN
// Omitting the required `astring` and `anumber` properties must be rejected.
expect(() => {
  const incomplete = {} as MyFirstStruct;
  acceptStruct(incomplete);
}).toThrow();
```
