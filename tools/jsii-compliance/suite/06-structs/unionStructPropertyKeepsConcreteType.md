# A union-typed struct property keeps its concrete type across the boundary

A struct property may be declared as a union of several types, for example a struct or a number. When the host passes
such a struct to the kernel and receives it back, the property MUST hold a value of the same concrete type the host
assigned: a struct value MUST be received as that struct type, with its properties, and a primitive value MUST be received
as that primitive. Optional properties that the host did not set MUST be received as unset.

## Reference Implementation

```ts
// GIVEN
export interface SecondLevelStruct {
  readonly deeperRequiredProp: string;
  readonly deeperOptionalProp?: string;
}

export interface TopLevelStruct {
  readonly required: string;
  readonly optional?: string;
  readonly secondLevel: SecondLevelStruct | number;
}

export class StructPassing {
  public static roundTrip(_positional: number, input: TopLevelStruct): TopLevelStruct {
    return {
      required: input.required,
      optional: input.optional,
      secondLevel: input.secondLevel,
    };
  }
}

// WHEN
const withStruct = StructPassing.roundTrip(123, {
  required: 'hello',
  secondLevel: { deeperRequiredProp: 'exists' },
});
const withNumber = StructPassing.roundTrip(123, { required: 'hello', secondLevel: 5 });

// THEN
expect(withStruct.required).toBe('hello');
expect(withStruct.optional).toBeUndefined();
expect((withStruct.secondLevel as SecondLevelStruct).deeperRequiredProp).toBe('exists');

expect(withNumber.required).toBe('hello');
expect(withNumber.optional).toBeUndefined();
expect(withNumber.secondLevel).toBe(5);
```
