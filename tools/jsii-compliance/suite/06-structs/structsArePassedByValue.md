# A struct is passed to the kernel by value and its properties are readable

When the host passes a struct to the kernel, it MUST serialize the struct by value, sending its properties as a plain
data object rather than an object reference. The kernel MUST then be able to read each individual property. A struct
that extends another struct MUST include the inherited properties when serialized. A property whose value is an object
reference MUST be passed by reference, so that the same instance is observed on both sides (identity is preserved). A
struct value returned from the kernel MUST expose the property values that were set in JavaScript.

## Reference Implementation

```ts
// GIVEN
export interface MyFirstStruct {
  readonly astring: string;
  readonly anumber: number;
  readonly firstOptional?: string[];
}

export interface DerivedStruct extends MyFirstStruct {
  readonly nonPrimitive: DoubleTrouble;
  readonly bool: boolean;
  readonly anotherRequired: Date;
}

export interface StructWithOnlyOptionals {
  readonly optional1?: string;
  readonly optional2?: number;
  readonly optional3?: boolean;
}

export class DoubleTrouble {
  /* a jsii class, used here only to observe reference identity */
}

export class GiveMeStructs {
  /** Returns the `anumber` from a MyFirstStruct struct. */
  public readFirstNumber(first: MyFirstStruct) {
    return first.anumber;
  }

  /** Returns the non-primitive member from a DerivedStruct struct. */
  public readDerivedNonPrimitive(derived: DerivedStruct) {
    return derived.nonPrimitive;
  }

  public get structLiteral(): StructWithOnlyOptionals {
    return { optional1: 'optional1FromStructLiteral', optional3: false };
  }
}

// WHEN
const firstStruct: MyFirstStruct = { astring: 'FirstString', anumber: 999, firstOptional: ['First', 'Optional'] };
const doubleTrouble = new DoubleTrouble();
const derivedStruct: DerivedStruct = {
  nonPrimitive: doubleTrouble,
  bool: false,
  anotherRequired: new Date(),
  astring: 'String',
  anumber: 1234,
  firstOptional: ['one', 'two'],
};

const gms = new GiveMeStructs();

// THEN
expect(gms.readFirstNumber(firstStruct)).toBe(999);
expect(gms.readFirstNumber(derivedStruct)).toBe(1234); // inherited property is present
expect(gms.readDerivedNonPrimitive(derivedStruct)).toBe(doubleTrouble); // passed by reference (identity)

const literal = gms.structLiteral;
expect(literal.optional1).toBe('optional1FromStructLiteral');
expect(literal.optional3).toBe(false);
expect(literal.optional2).toBeUndefined();
```
