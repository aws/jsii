# A struct received from the kernel is indistinguishable from one built by the host

A struct value received from the kernel MUST be indistinguishable from a struct value constructed by the host with the
same content. Reading corresponding properties MUST yield equal values, including optional properties that are unset on
both sides. The received struct and the host-built struct MUST compare equal under the host's idiomatic value
comparison, in both directions.

## Reference Implementation

```ts
// GIVEN
export interface StructWithOnlyOptionals {
  readonly optional1?: string;
  readonly optional2?: number;
  readonly optional3?: boolean;
}

export class GiveMeStructs {
  public get structLiteral(): StructWithOnlyOptionals {
    return { optional1: 'optional1FromStructLiteral', optional3: false };
  }
}

// WHEN
const gms = new GiveMeStructs();
const returnedLiteral = gms.structLiteral;
const nativeBuilt: StructWithOnlyOptionals = { optional1: 'optional1FromStructLiteral', optional3: false };

// THEN
expect(returnedLiteral.optional1).toBe(nativeBuilt.optional1);
expect(returnedLiteral.optional2).toBe(nativeBuilt.optional2); // both unset
expect(returnedLiteral.optional3).toBe(nativeBuilt.optional3);

expect(returnedLiteral).toEqual(nativeBuilt); // value comparison, both directions
expect(nativeBuilt).toEqual(returnedLiteral);
```
