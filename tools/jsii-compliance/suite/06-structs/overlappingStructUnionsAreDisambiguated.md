# Overlapping struct types in a union are correctly disambiguated

When a kernel method accepts a union of two or more struct types whose shapes can structurally overlap, a statically
typed host must still be able to recover the intended declared type. The host MUST pass the struct value as plain data,
and the kernel MUST determine which member of the union the value represents based on the properties present. For a
value built as one member of the union, a test for that member MUST report `true` and a test for any other member MUST
report `false`, even when the members share one or more properties.

## Reference Implementation

```ts
// GIVEN
export interface StructA {
  readonly requiredString: string;
  readonly optionalString?: string;
  readonly optionalNumber?: number;
}
// Intentionally overlaps with StructA (when only `requiredString` is provided) to test that the
// kernel properly disambiguates them.
export interface StructB {
  readonly requiredString: string;
  readonly optionalBoolean?: boolean;
  readonly optionalStructA?: StructA;
}

export class StructUnionConsumer {
  public static isStructA(struct: StructA | StructB): struct is StructA {
    const keys = new Set(Object.keys(struct));
    switch (keys.size) {
      case 1:
        return keys.has('requiredString');
      case 2:
        return keys.has('requiredString') && (keys.has('optionalNumber') || keys.has('optionalString'));
      case 3:
        return keys.has('requiredString') && keys.has('optionalNumber') && keys.has('optionalString');
      default:
        return false;
    }
  }
  public static isStructB(struct: StructA | StructB): struct is StructB {
    const keys = new Set(Object.keys(struct));
    switch (keys.size) {
      case 1:
        return keys.has('requiredString');
      case 2:
        return keys.has('requiredString') && (keys.has('optionalBoolean') || keys.has('optionalStructA'));
      default:
        return false;
    }
  }
  private constructor() {}
}

// WHEN
const a0: StructA = { requiredString: 'Present!', optionalString: 'Bazinga!' };
const a1: StructA = { requiredString: 'Present!', optionalNumber: 1337 };
const b0: StructB = { requiredString: 'Present!', optionalBoolean: true };
const b1: StructB = { requiredString: 'Present!', optionalStructA: a1 };

// THEN
expect(StructUnionConsumer.isStructA(a0)).toBe(true);
expect(StructUnionConsumer.isStructA(a1)).toBe(true);
expect(StructUnionConsumer.isStructA(b0)).toBe(false);
expect(StructUnionConsumer.isStructA(b1)).toBe(false);

expect(StructUnionConsumer.isStructB(a0)).toBe(false);
expect(StructUnionConsumer.isStructB(a1)).toBe(false);
expect(StructUnionConsumer.isStructB(b0)).toBe(true);
expect(StructUnionConsumer.isStructB(b1)).toBe(true);
```
