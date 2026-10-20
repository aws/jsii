# Structs cross the boundary as plain data without type decoration

When the host passes a struct to the kernel, it MUST serialize the struct as a plain data object whose keys are exactly
the struct's set properties and whose values are the serialized property values. The host MUST NOT add any type tag,
wrapper, or other decoration identifying the struct type: a struct crosses the boundary as anonymous data, and the
kernel infers the type from the receiving parameter.

## Reference Implementation

```ts
// GIVEN
export interface StructA {
  readonly requiredString: string;
  readonly optionalString?: string;
  readonly optionalNumber?: number;
}
export interface StructB {
  readonly requiredString: string;
  readonly optionalBoolean?: boolean;
  readonly optionalStructA?: StructA;
}

// WHEN
const value: StructB = { requiredString: 'Bazinga!', optionalBoolean: false };

// THEN
// The data the host sends to the kernel for `value` is exactly its set properties,
// carrying no type decoration.
expect(value).toEqual({ requiredString: 'Bazinga!', optionalBoolean: false });
expect(Object.keys(value).sort()).toEqual(['optionalBoolean', 'requiredString']);
```
